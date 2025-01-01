const { register, login } = require('../controllers/userController');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

jest.mock('../models/User');
jest.mock('jsonwebtoken');

describe('Register & Login Test ', () => {
  let req;
  let res;
  
  beforeEach(() => {
    req = {
      body: {
        email: 'karan@test.com',
        password: 'password123',
        name: 'Test User'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should create a new user successfully', async () => {
      User.findOne.mockResolvedValue(null);
      User.prototype.save.mockResolvedValue({});

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ token: undefined });
    });

    it('should return error if email already exists', async () => {
      User.findOne.mockResolvedValue({ email: 'karan@test.com' });

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Email is already in use' });
    });

    it('should return error if email or password is missing', async () => {
      req.body = {};

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Email and password are required' });
    });
  });

  describe('login', () => {
    it('should login user successfully and return token', async () => {
      const mockUser = {
        _id: 'user123',
        email: 'karan@test.com',
        password: 'password123'
      };
      const mockToken = 'mockToken123';

      User.findOne.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue(mockToken);

      await login(req, res);

      expect(res.json).toHaveBeenCalledWith({ token: mockToken });
    });

    it('should return error for invalid credentials', async () => {
      User.findOne.mockResolvedValue(null);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
    });
  });
});