const {
    createApplication,
    getApplications,
    updateApplication,
    deleteApplication
} = require('../controllers/applicationController');
const Application = require('../models/Application');

jest.mock('../models/Application');

describe('Create Application Test', () => {
    let req;
    let res;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            user: { _id: 'mockUserId123' },
            body: {
                personalDetails: {
                    name: 'karan surana',
                    address: '123 Main St',
                    phone: '1234567890'
                },
                financialDetails: {
                    income: 50000,
                    expenses: 30000,
                    assets: 'House, Car',
                    liabilities: 'Mortgage'
                }
            }
        };

        res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };
    });

    test('should create application successfully', async () => {
        const mockApplicationData = {
            _id: 'mockAppId123',
            userId: req.user._id,
            personalDetails: req.body.personalDetails,
            financialDetails: req.body.financialDetails,
            createdAt: new Date()
        };

        const mockSavedDocument = {
            ...mockApplicationData,
            toObject: jest.fn().mockReturnValue(mockApplicationData)
        };

        const save = jest.fn().mockResolvedValue(mockSavedDocument);
        Application.mockImplementation(() => ({
            save
        }));

        await createApplication(req, res);

        expect(Application).toHaveBeenCalledWith({
            userId: req.user._id,
            personalDetails: req.body.personalDetails,
            financialDetails: req.body.financialDetails
        });

        expect(save).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockApplicationData);
    });
});


describe('Get, Update, Delete Application Test', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {
            user: { _id: 'user123' },
            body: {
                personalDetails: {
                    name: 'Test User',
                    address: '123 Test St',
                    phone: '234567890'
                },
                financialDetails: {
                    income: 50000,
                    expenses: 30000,
                    assets: 'Car, House',
                    liabilities: 'Mortgage'
                }
            },
            params: { id: 'app123' }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        jest.clearAllMocks();
    });

    describe('getApplications', () => {
        it('should get all applications for user', async () => {
            const mockApplications = [
                {
                    _id: 'app123',
                    userId: 'user123',
                    personalDetails: req.body.personalDetails,
                    financialDetails: req.body.financialDetails
                }
            ];
            Application.find.mockResolvedValue(mockApplications);

            await getApplications(req, res);

            expect(res.json).toHaveBeenCalledWith(mockApplications);
        });

        it('should handle find error properly', async () => {
            const mockError = new Error('Database error');
            Application.find.mockRejectedValue(mockError);

            await getApplications(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        });
    });

    describe('updateApplication', () => {
        it('should update application successfully', async () => {
            const mockUpdatedApplication = {
                _id: 'app123',
                userId: req.user._id,
                personalDetails: req.body.personalDetails,
                financialDetails: req.body.financialDetails
            };
            Application.findByIdAndUpdate.mockResolvedValue(mockUpdatedApplication);

            await updateApplication(req, res);

            expect(res.json).toHaveBeenCalledWith(mockUpdatedApplication);
        });

        it('should return error if application not found', async () => {
            Application.findByIdAndUpdate.mockResolvedValue(null);

            await updateApplication(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Application not found' });
        });

        it('should handle update error properly', async () => {
            const mockError = new Error('Database error');
            Application.findByIdAndUpdate.mockRejectedValue(mockError);

            await updateApplication(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        });
    });

    describe('deleteApplication', () => {
        it('should delete application successfully', async () => {
            Application.findByIdAndDelete.mockResolvedValue({ _id: 'app123' });

            await deleteApplication(req, res);

            expect(res.json).toHaveBeenCalledWith({
                message: 'Application deleted successfully'
            });
        });

        it('should return error if application not found', async () => {
            Application.findByIdAndDelete.mockResolvedValue(null);

            await deleteApplication(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Application not found' });
        });

        it('should handle delete error properly', async () => {
            const mockError = new Error('Database error');
            Application.findByIdAndDelete.mockRejectedValue(mockError);

            await deleteApplication(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        });
    });
});