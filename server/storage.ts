import { users, projects, services, testimonials, messages } from "../shared/schema.js";
import type { 
  User, InsertUser, 
  Project, InsertProject, 
  Service, InsertService, 
  Testimonial, InsertTestimonial, 
  Message, InsertMessage 
} from "../shared/schema.js";
import { compareSync, hashSync } from 'bcryptjs';

// Storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project methods
  getAllProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: InsertProject): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Service methods
  getAllServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: InsertService): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;
  
  // Testimonial methods
  getAllTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: number, testimonial: InsertTestimonial): Promise<Testimonial | undefined>;
  deleteTestimonial(id: number): Promise<boolean>;
  
  // Message methods
  getAllMessages(): Promise<Message[]>;
  getMessage(id: number): Promise<Message | undefined>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: number): Promise<Message | undefined>;
  deleteMessage(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private services: Map<number, Service>;
  private testimonials: Map<number, Testimonial>;
  private messages: Map<number, Message>;
  
  private userCurrentId: number = 1;
  private projectCurrentId: number = 1;
  private serviceCurrentId: number = 1;
  private testimonialCurrentId: number = 1;
  private messageCurrentId: number = 1;
  
  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.services = new Map();
    this.testimonials = new Map();
    this.messages = new Map();
    
    // Initialize with default data
    this.initializeDefaultData();
  }
  
  private initializeDefaultData() {
    // Default services
    const defaultServices = [
      {
        title: 'Custom Software Development',
        description: 'Tailored solutions designed to meet your specific business requirements and objectives with cutting-edge technologies.',
        icon: 'Code'
      },
      {
        title: 'Mobile App Development',
        description: 'Create engaging, high-performance native and cross-platform mobile applications for iOS and Android devices.',
        icon: 'Smartphone'
      },
      {
        title: 'Web Development',
        description: 'Design and develop responsive, user-friendly websites and web applications with modern technologies.',
        icon: 'Globe'
      },
      {
        title: 'UI/UX Design',
        description: 'Create intuitive, visually appealing interfaces that provide exceptional user experiences and drive engagement.',
        icon: 'Palette'
      },
      {
        title: 'API Development & Integration',
        description: 'Build scalable APIs and integrate third-party services to enhance your application\'s functionality.',
        icon: 'LineChart'
      },
      {
        title: 'DevOps & Cloud Services',
        description: 'Implement DevOps practices and leverage cloud platforms to ensure efficient development and deployment.',
        icon: 'Cloud'
      }
    ];
    
    // Default projects
    const defaultProjects = [
      {
        title: 'SEAMSAAR',
        description: 'A one-stop online platform for car and real estate rentals in Syria, providing easy search and booking options.',
        fullDescription: 'SEAMSAAR is a one-stop online platform for car and real estate rentals in Syria, providing easy search and booking options. It also includes a travel guide section featuring Syria\'s best tourist spots, serving as a useful tool for locals and tourists alike.',
        challenge: 'Creating a comprehensive platform that combines multiple rental services while maintaining simplicity and ease of use.',
        solution: 'We developed a modular architecture that allows different types of listings to coexist with unified search and booking experiences.',
        client: 'Seamsaar Company',
        date: '2023',
        link: 'https://seamsaar.com',
        image: 'https://images.unsplash.com/photo-1534531173927-aeb928d54385?auto=format&fit=crop&w=800&q=80',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
        features: [
          'Advanced search functionality',
          'Booking management system',
          'User reviews and ratings',
          'Interactive travel guides',
          'Multi-language support'
        ],
        tags: ['Web Platform', 'Booking System'],
        gallery: [
          'https://images.unsplash.com/photo-1549817556-b7d78326026d?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1535086181678-5a5c4d23aa7d?auto=format&fit=crop&w=800&q=80'
        ]
      },
      {
        title: 'KANZ AL-DHAKEREEN',
        description: 'A free, ad-free app designed to help users easily incorporate daily remembrance (dhikr) and supplications (dua) into their routine.',
        fullDescription: 'KANZ AL-DHAKEREEN is a free, ad-free app designed to help you easily incorporate daily remembrance (dhikr) and supplications (dua) into your routine. With a simple and elegant interface, it serves as a spiritual companion, bringing peace and enlightenment to your heart and soul through consistent devotion.',
        challenge: 'Creating a distraction-free, serene experience that respects the spiritual nature of the content while ensuring accuracy and authenticity.',
        solution: 'We implemented a minimalist design with careful attention to typography and spacing, while sourcing all content from authenticated Islamic references.',
        client: 'Islamic Foundation',
        date: '2022',
        link: 'https://kanzaldhakereen.com',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        technologies: ['React Native', 'Firebase', 'Redux', 'i18next'],
        features: [
          'Daily dhikr notifications',
          'Favorites collection',
          'Progress tracking',
          'Audio recitations',
          'Customizable themes',
          'Offline access'
        ],
        tags: ['Mobile App', 'Religious'],
        gallery: [
          'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1542931291-6533cbe45d18?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1543069923-89be2a2be4cc?auto=format&fit=crop&w=800&q=80'
        ]
      },
      {
        title: 'CARK',
        description: 'A comprehensive platform for showcasing and selling cars, featuring location-based car listings for a more convenient search experience.',
        fullDescription: 'CARK is a comprehensive platform for showcasing and selling cars, featuring location-based car listings for a more convenient search experience. It also supports paid advertisements to highlight listings and accelerate sales.',
        challenge: 'Building a robust marketplace that handles complex filtering, location-based searching, and transaction management.',
        solution: 'We created a scalable architecture with geospatial indexing, advanced filtering algorithms, and secure payment processing.',
        client: 'CarK Inc.',
        date: '2023',
        link: 'https://cark.com',
        image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80',
        technologies: ['Angular', 'Node.js', 'PostgreSQL', 'AWS', 'Socket.io'],
        features: [
          'Advanced car search with multiple filters',
          'Interactive map-based listings',
          'In-app messaging between buyers and sellers',
          'Promoted listings functionality',
          'Vehicle history reports integration'
        ],
        tags: ['E-commerce', 'Automotive'],
        gallery: [
          'https://images.unsplash.com/photo-1559533148-e7370d3d7bf9?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80'
        ]
      }
    ];
    
    // Default testimonials
    const defaultTestimonials = [
      {
        name: 'Ahmad Khalil',
        company: 'CEO, Seamsaar',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        content: 'The Nexus team delivered an exceptional platform that exceeded our expectations. Their attention to detail and commitment to quality resulted in a user-friendly solution that has significantly improved our business operations.'
      },
      {
        name: 'Sara Al-Ahmed',
        company: 'Product Manager, Nabd Healthcare',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        content: 'Working with Nexus was a game-changer for our healthcare platform. They understood our specific needs and delivered a secure, user-friendly app that has transformed how we connect with patients.'
      },
      {
        name: 'Mohammed Farhat',
        company: 'Founder, CarK',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        content: 'Nexus turned our vision into reality with CarK platform. Their technical expertise and innovative approach created a seamless experience for our users, resulting in increased engagement and sales.'
      }
    ];
    
    // Add default services
    defaultServices.forEach(service => {
      this.createService(service as InsertService);
    });
    
    // Add default projects
    defaultProjects.forEach(project => {
      this.createProject(project as InsertProject);
    });
    
    // Add default testimonials
    defaultTestimonials.forEach(testimonial => {
      this.createTestimonial(testimonial as InsertTestimonial);
    });
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
      if (user.username === username) {
        return user;
      }
    }
    return undefined;
  }
  
  async createUser(userData: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const hashedPassword = hashSync(userData.password, 10);
    
    const user: User = {
      id,
      username: userData.username,
      password: hashedPassword,
      role: userData.role || "admin",
      createdAt: new Date()
    };
    
    this.users.set(id, user);
    return user;
  }
  
  // Authenticate user (additional helper method)
  async authenticateUser(username: string, password: string): Promise<User | undefined> {
    const user = await this.getUserByUsername(username);
    
    if (!user) {
      return undefined;
    }
    
    const passwordValid = compareSync(password, user.password);
    
    return passwordValid ? user : undefined;
  }
  
  // Project methods
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }
  
  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }
  
  async createProject(projectData: InsertProject): Promise<Project> {
    const id = this.projectCurrentId++;
    const now = new Date();
    
    const project: Project = {
      id,
      ...projectData,
      createdAt: now,
      updatedAt: now
    };
    
    this.projects.set(id, project);
    return project;
  }
  
  async updateProject(id: number, projectData: InsertProject): Promise<Project | undefined> {
    const existingProject = this.projects.get(id);
    
    if (!existingProject) {
      return undefined;
    }
    
    const updatedProject: Project = {
      ...existingProject,
      ...projectData,
      id,
      updatedAt: new Date()
    };
    
    this.projects.set(id, updatedProject);
    return updatedProject;
  }
  
  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }
  
  // Service methods
  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }
  
  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }
  
  async createService(serviceData: InsertService): Promise<Service> {
    const id = this.serviceCurrentId++;
    const now = new Date();
    
    const service: Service = {
      id,
      ...serviceData,
      createdAt: now,
      updatedAt: now
    };
    
    this.services.set(id, service);
    return service;
  }
  
  async updateService(id: number, serviceData: InsertService): Promise<Service | undefined> {
    const existingService = this.services.get(id);
    
    if (!existingService) {
      return undefined;
    }
    
    const updatedService: Service = {
      ...existingService,
      ...serviceData,
      id,
      updatedAt: new Date()
    };
    
    this.services.set(id, updatedService);
    return updatedService;
  }
  
  async deleteService(id: number): Promise<boolean> {
    return this.services.delete(id);
  }
  
  // Testimonial methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }
  
  async createTestimonial(testimonialData: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialCurrentId++;
    
    const testimonial: Testimonial = {
      id,
      ...testimonialData,
      createdAt: new Date()
    };
    
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  
  async updateTestimonial(id: number, testimonialData: InsertTestimonial): Promise<Testimonial | undefined> {
    const existingTestimonial = this.testimonials.get(id);
    
    if (!existingTestimonial) {
      return undefined;
    }
    
    const updatedTestimonial: Testimonial = {
      ...existingTestimonial,
      ...testimonialData,
      id
    };
    
    this.testimonials.set(id, updatedTestimonial);
    return updatedTestimonial;
  }
  
  async deleteTestimonial(id: number): Promise<boolean> {
    return this.testimonials.delete(id);
  }
  
  // Message methods
  async getAllMessages(): Promise<Message[]> {
    return Array.from(this.messages.values());
  }
  
  async getMessage(id: number): Promise<Message | undefined> {
    return this.messages.get(id);
  }
  
  async createMessage(messageData: InsertMessage): Promise<Message> {
    const id = this.messageCurrentId++;
    
    const message: Message = {
      id,
      ...messageData,
      isRead: false,
      createdAt: new Date()
    };
    
    this.messages.set(id, message);
    return message;
  }
  
  async markMessageAsRead(id: number): Promise<Message | undefined> {
    const existingMessage = this.messages.get(id);
    
    if (!existingMessage) {
      return undefined;
    }
    
    const updatedMessage: Message = {
      ...existingMessage,
      isRead: true
    };
    
    this.messages.set(id, updatedMessage);
    return updatedMessage;
  }
  
  async deleteMessage(id: number): Promise<boolean> {
    return this.messages.delete(id);
  }
}

export const storage = new MemStorage();
