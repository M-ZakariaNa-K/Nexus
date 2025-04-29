import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { authenticateUser, verifyJWT, createToken } from "./auth";
import { z } from "zod";
import { 
  insertProjectSchema, 
  insertServiceSchema, 
  insertTestimonialSchema, 
  insertMessageSchema, 
  insertUserSchema 
} from "../shared/schema.js";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post('/api/login', async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
      
      const user = await authenticateUser(username, password);
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Create JWT token
      const token = createToken(user);
      
      // Set token in secure HTTP-only cookie
      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        path: '/'
      });
      
      return res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.post('/api/logout', (req: Request, res: Response) => {
    res.clearCookie('auth_token');
    return res.status(200).json({ message: 'Logged out successfully' });
  });
  
  app.get('/api/auth/check', verifyJWT, (req: Request, res: Response) => {
    return res.status(200).json({ 
      authenticated: true,
      user: req.user
    });
  });
  
  // Projects routes
  app.get('/api/projects', async (req: Request, res: Response) => {
    try {
      const projects = await storage.getAllProjects();
      return res.status(200).json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.get('/api/projects/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid project ID' });
      }
      
      const project = await storage.getProject(id);
      
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      return res.status(200).json(project);
    } catch (error) {
      console.error('Error fetching project:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.post('/api/projects', verifyJWT, async (req: Request, res: Response) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const newProject = await storage.createProject(projectData);
      return res.status(201).json(newProject);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid project data', errors: error.errors });
      }
      console.error('Error creating project:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.put('/api/projects/:id', verifyJWT, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid project ID' });
      }
      
      const projectData = insertProjectSchema.parse(req.body);
      const updatedProject = await storage.updateProject(id, projectData);
      
      if (!updatedProject) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      return res.status(200).json(updatedProject);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid project data', errors: error.errors });
      }
      console.error('Error updating project:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.delete('/api/projects/:id', verifyJWT, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid project ID' });
      }
      
      const success = await storage.deleteProject(id);
      
      if (!success) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      return res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      console.error('Error deleting project:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Services routes
  app.get('/api/services', async (req: Request, res: Response) => {
    try {
      const services = await storage.getAllServices();
      return res.status(200).json(services);
    } catch (error) {
      console.error('Error fetching services:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.post('/api/services', verifyJWT, async (req: Request, res: Response) => {
    try {
      const serviceData = insertServiceSchema.parse(req.body);
      const newService = await storage.createService(serviceData);
      return res.status(201).json(newService);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid service data', errors: error.errors });
      }
      console.error('Error creating service:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.put('/api/services/:id', verifyJWT, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid service ID' });
      }
      
      const serviceData = insertServiceSchema.parse(req.body);
      const updatedService = await storage.updateService(id, serviceData);
      
      if (!updatedService) {
        return res.status(404).json({ message: 'Service not found' });
      }
      
      return res.status(200).json(updatedService);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid service data', errors: error.errors });
      }
      console.error('Error updating service:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.delete('/api/services/:id', verifyJWT, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid service ID' });
      }
      
      const success = await storage.deleteService(id);
      
      if (!success) {
        return res.status(404).json({ message: 'Service not found' });
      }
      
      return res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
      console.error('Error deleting service:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Testimonials routes
  app.get('/api/testimonials', async (req: Request, res: Response) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      return res.status(200).json(testimonials);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.post('/api/testimonials', verifyJWT, async (req: Request, res: Response) => {
    try {
      const testimonialData = insertTestimonialSchema.parse(req.body);
      const newTestimonial = await storage.createTestimonial(testimonialData);
      return res.status(201).json(newTestimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid testimonial data', errors: error.errors });
      }
      console.error('Error creating testimonial:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.put('/api/testimonials/:id', verifyJWT, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid testimonial ID' });
      }
      
      const testimonialData = insertTestimonialSchema.parse(req.body);
      const updatedTestimonial = await storage.updateTestimonial(id, testimonialData);
      
      if (!updatedTestimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
      }
      
      return res.status(200).json(updatedTestimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid testimonial data', errors: error.errors });
      }
      console.error('Error updating testimonial:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.delete('/api/testimonials/:id', verifyJWT, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid testimonial ID' });
      }
      
      const success = await storage.deleteTestimonial(id);
      
      if (!success) {
        return res.status(404).json({ message: 'Testimonial not found' });
      }
      
      return res.status(200).json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Contact messages routes
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      const newMessage = await storage.createMessage(messageData);
      return res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid message data', errors: error.errors });
      }
      console.error('Error creating message:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.get('/api/messages', verifyJWT, async (req: Request, res: Response) => {
    try {
      const messages = await storage.getAllMessages();
      return res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.put('/api/messages/:id/read', verifyJWT, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid message ID' });
      }
      
      const updatedMessage = await storage.markMessageAsRead(id);
      
      if (!updatedMessage) {
        return res.status(404).json({ message: 'Message not found' });
      }
      
      return res.status(200).json(updatedMessage);
    } catch (error) {
      console.error('Error updating message:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.delete('/api/messages/:id', verifyJWT, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid message ID' });
      }
      
      const success = await storage.deleteMessage(id);
      
      if (!success) {
        return res.status(404).json({ message: 'Message not found' });
      }
      
      return res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
      console.error('Error deleting message:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Initialize data
  app.get('/api/init', async (req: Request, res: Response) => {
    try {
      // Check if admin user exists, if not create one
      const adminExists = await storage.getUserByUsername('admin');
      
      if (!adminExists) {
        const adminUser = {
          username: 'admin',
          password: 'admin123', // This would be hashed in the storage layer
          role: 'admin'
        };
        
        await storage.createUser(adminUser);
      }
      
      return res.status(200).json({ message: 'Initialization completed successfully' });
    } catch (error) {
      console.error('Error during initialization:', error);
      return res.status(500).json({ message: 'Server error during initialization' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
