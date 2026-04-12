import Skill from "../models/skill.model.js" 

const getAdminPanel =  (req, res) => res.send("This Adim Area Page where only admin can access!");

const showSkills = async (req, res) => {
  const skills = await Skill.find().sort({ category: 1 });
  res.render('admin/skills', { skills });
}

const addSkill = async (req, res) => {
  try {
    const { category, name, percentage, icon } = req.body;
    const newSkill = new Skill({ category, name, percentage, icon });
    await newSkill.save();
    res.redirect('/admin/skills');
  } catch (err) {
    res.status(500).send('Error adding skill');
  }
};

const deleteSkillById = async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.redirect('/admin/skills');
  } catch (err) {
    res.status(500).send('Error deleting skill');
  }
}

export {
    getAdminPanel ,
    showSkills ,
    addSkill ,
    deleteSkillById
}