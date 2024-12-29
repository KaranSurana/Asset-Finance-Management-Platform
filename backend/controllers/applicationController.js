const Application = require('../models/Application');

//Creating Application controller
exports.createApplication = async (req, res) => {
  try {
    //destructuring the request    
    const { personalDetails, financialDetails } = req.body;
    
    if (!personalDetails || !financialDetails) {
      return res.status(400).json({ error: 'Personal and financial details are required' });
    }

    // Creating a new application document.
    const application = new Application({
      "userId":req.user._id,
      personalDetails,
      financialDetails,
    });
    
    const savedApplication = await application.save();
    
    const applicationData = savedApplication.toObject();
    res.status(201).json(applicationData);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

//Getting All Applications controller
exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user._id });
    res.json(applications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Updating an Application controller
exports.updateApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Deleting an Application controller
exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};