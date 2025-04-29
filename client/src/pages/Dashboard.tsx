import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { fadeIn } from '../lib/motion';
import {
  Briefcase, Building2, MessageSquare, Users, Plus,
  Edit2, Trash2, LogOut, LayoutGrid
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { useToast } from '../hooks/use-toast';
import { apiRequest, queryClient } from '../lib/queryClient';

const Dashboard = () => {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('projects');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string, type: string } | null>(null);
  const { toast } = useToast();

  // Check authentication
  const { data: authData, isLoading: authLoading, error: authError } = useQuery({
    queryKey: ['/api/auth/check'],
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && (!authData || !authData.authenticated)) {
      setLocation('/login');
    }
  }, [authData, authLoading, setLocation]);

  // Fetch data for different sections
  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['/api/projects'],
  });

  const { data: services, isLoading: servicesLoading } = useQuery({
    queryKey: ['/api/services'],
  });

  const { data: testimonials, isLoading: testimonialsLoading } = useQuery({
    queryKey: ['/api/testimonials'],
  });

  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ['/api/messages'],
  });

  // Mutations
  const deleteMutation = useMutation({
    mutationFn: async ({ id, type }: { id: string, type: string }) => {
      return apiRequest('DELETE', `/api/${type}/${id}`, null);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [`/api/${variables.type}`] });
      toast({
        title: 'Item deleted',
        description: 'The item has been successfully deleted.',
      });
      setIsDeleteDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to delete the item. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handleDelete = (id: string, type: string) => {
    setItemToDelete({ id, type });
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteMutation.mutate(itemToDelete);
    }
  };

  const handleLogout = async () => {
    try {
      await apiRequest('POST', '/api/logout', null);
      queryClient.clear();
      setLocation('/login');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to log out. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#171717] flex items-center justify-center">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-[#02ECD1]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#171717] text-white">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 bottom-0 w-64 bg-[#171717] border-r border-[#313131] z-50 hidden lg:block">
        <div className="p-6">
          <div className="flex items-center mb-10">
            <span className="font-poppins font-bold text-2xl text-[#02ECD1]">Nexus</span>
            <span className="font-poppins font-light text-2xl ml-1">Admin</span>
          </div>

          <nav className="space-y-1">
            <button
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'projects' ? 'bg-[#02ECD1]/10 text-[#02ECD1]' : 'text-gray-300 hover:bg-[#02ECD1]/5 hover:text-[#02ECD1]'}`}
              onClick={() => setActiveTab('projects')}
            >
              <Briefcase className="h-5 w-5" />
              <span>Projects</span>
            </button>

            <button
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'services' ? 'bg-[#02ECD1]/10 text-[#02ECD1]' : 'text-gray-300 hover:bg-[#02ECD1]/5 hover:text-[#02ECD1]'}`}
              onClick={() => setActiveTab('services')}
            >
              <Building2 className="h-5 w-5" />
              <span>Services</span>
            </button>

            <button
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'testimonials' ? 'bg-[#02ECD1]/10 text-[#02ECD1]' : 'text-gray-300 hover:bg-[#02ECD1]/5 hover:text-[#02ECD1]'}`}
              onClick={() => setActiveTab('testimonials')}
            >
              <Users className="h-5 w-5" />
              <span>Testimonials</span>
            </button>

            <button
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'messages' ? 'bg-[#02ECD1]/10 text-[#02ECD1]' : 'text-gray-300 hover:bg-[#02ECD1]/5 hover:text-[#02ECD1]'}`}
              onClick={() => setActiveTab('messages')}
            >
              <MessageSquare className="h-5 w-5" />
              <span>Messages</span>
            </button>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Button
            variant="ghost"
            className="w-full flex items-center justify-center space-x-2 text-gray-400 hover:text-[#02ECD1] hover:bg-transparent"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span>Log Out</span>
          </Button>
        </div>
      </div>

      {/* Mobile header */}
      <div className="lg:hidden bg-[#171717] border-b border-[#313131] p-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-poppins font-bold text-xl text-[#02ECD1]">Nexus</span>
            <span className="font-poppins font-light text-xl ml-1">Admin</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-[#02ECD1]"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-4 bg-[#171717]">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main content */}
      <div className="lg:ml-64 min-h-screen">
        <div className="container p-6 pt-6 lg:pt-12">
          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <motion.div
              variants={fadeIn('up', 0.3)}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-poppins font-bold">Projects</h1>
                <Button className="bg-[#02ECD1] text-[#0C0C0C] hover:bg-opacity-90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
              </div>

              {projectsLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#02ECD1]"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(projects || []).map((project: any) => (
                    <div key={project.id} className="bg-[#171717] rounded-lg overflow-hidden">
                      <div className="h-48 overflow-hidden relative">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#171717] to-transparent"></div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-[#02ECD1]">{project.title}</h3>
                        <p className="text-gray-400 text-sm mt-2 line-clamp-2">{project.description}</p>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex space-x-1">
                            <Button size="sm" variant="ghost" className="text-gray-300 hover:text-[#02ECD1]">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-gray-300 hover:text-red-500"
                              onClick={() => handleDelete(project.id, 'projects')}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button size="sm" variant="outline" className="text-xs border-[#02ECD1] text-[#02ECD1] hover:bg-[#02ECD1]/10">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <motion.div
              variants={fadeIn('up', 0.3)}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-poppins font-bold">Services</h1>
                <Button className="bg-[#02ECD1] text-[#0C0C0C] hover:bg-opacity-90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Service
                </Button>
              </div>

              {servicesLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#02ECD1]"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(services || []).map((service: any) => (
                    <div key={service.id} className="bg-[#171717] rounded-lg p-6">
                      <div className="w-12 h-12 rounded-lg bg-[#02ECD1]/10 flex items-center justify-center mb-4">
                        <span className="text-[#02ECD1]">{service.icon}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" className="text-gray-300 hover:text-[#02ECD1]">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-gray-300 hover:text-red-500"
                          onClick={() => handleDelete(service.id, 'services')}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Testimonials Tab */}
          {activeTab === 'testimonials' && (
            <motion.div
              variants={fadeIn('up', 0.3)}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-poppins font-bold">Testimonials</h1>
                <Button className="bg-[#02ECD1] text-[#0C0C0C] hover:bg-opacity-90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Testimonial
                </Button>
              </div>

              {testimonialsLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#02ECD1]"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(testimonials || []).map((testimonial: any) => (
                    <div key={testimonial.id} className="bg-[#171717] rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{testimonial.name}</h3>
                          <p className="text-gray-400 text-xs">{testimonial.company}</p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-4">"{testimonial.content}"</p>
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost" className="text-gray-300 hover:text-[#02ECD1]">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-300 hover:text-red-500"
                            onClick={() => handleDelete(testimonial.id, 'testimonials')}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex text-yellow-400">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <motion.div
              variants={fadeIn('up', 0.3)}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-poppins font-bold">Messages</h1>
              </div>

              {messagesLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#02ECD1]"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {(messages || []).length > 0 ? (
                    (messages || []).map((message: any) => (
                      <div key={message.id} className="bg-[#171717] rounded-lg p-6">
                        <div className="flex justify-between mb-2">
                          <h3 className="font-semibold">{message.name}</h3>
                          <span className="text-xs text-gray-400">{new Date(message.date).toLocaleDateString()}</span>
                        </div>
                        <div className="text-sm text-gray-400 mb-2">
                          <span>{message.email}</span>
                          <span className="mx-2">•</span>
                          <span>{message.subject}</span>
                        </div>
                        <p className="text-gray-300 text-sm mb-4">{message.message}</p>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="bg-[#02ECD1] text-[#0C0C0C] hover:bg-opacity-90 text-xs"
                          >
                            Reply
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-300 hover:text-red-500"
                            onClick={() => handleDelete(message.id, 'messages')}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-[#171717] rounded-lg p-8 text-center">
                      <MessageSquare className="h-12 w-12 mx-auto text-gray-500 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No Messages Yet</h3>
                      <p className="text-gray-400">You haven't received any contact messages.</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-[#171717] text-white border-[#313131]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete this item? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-gray-600 text-gray-300 hover:bg-transparent hover:text-white"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
