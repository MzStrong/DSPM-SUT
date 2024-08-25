const { Gender, Relationship, Topic } = require("../app/models/index");

// สร้างข้อมูลใหม่ในตาราง genders หากยังไม่มีข้อมูลนี้อยู่
async function createGenders() {
  try {
    await Gender.findOrCreate({ where: { name: "ชาย" } });
    await Gender.findOrCreate({ where: { name: "หญิง" } });
    await Gender.findOrCreate({ where: { name: "อื่นๆ" } });
    console.log("Genders created successfully");
  } catch (error) {
    console.error("Error creating genders:", error);
  }
}

// สร้างข้อมูลใหม่ในตาราง relationships หากยังไม่มีข้อมูลนี้อยู่
async function createRelationship() {
  try {
    await Relationship.findOrCreate({ where: { name: "บิดา" } });
    await Relationship.findOrCreate({ where: { name: "มารดา" } });
    await Relationship.findOrCreate({ where: { name: "อื่นๆ" } });
    console.log("Relationship created successfully");
  } catch (error) {
    console.error("Error creating relationship:", error);
  }
}

// สร้างข้อมูลใหม่ในตาราง topics หากยังไม่มีข้อมูลนี้อยู่
async function createTopic() {
  try {
    await Topic.findOrCreate({
      where: { name: "พัฒนาการด้านการเคลื่อนไหว : Gross motor (GM)" },
    });
    await Topic.findOrCreate({
      where: {
        name: "พัฒนาการด้านกล้ามเนื้อมัดเล็กและสติปัญญา : Fine Motor (FM)",
      },
    });
    await Topic.findOrCreate({
      where: { name: "พัฒนาการด้านการเข้าใจภาษา : Receptive Language (RL)" },
    });
    await Topic.findOrCreate({
      where: { name: "พัฒนาการด้านการใช้ภาษา : Expressive Language (EL)" },
    });
    await Topic.findOrCreate({
      where: {
        name: "พัฒนาการด้านการช่วยเหลือตนเองและสังคม : Personal and Social (PS)",
      },
    });
    console.log("Topic created successfully");
  } catch (error) {
    console.error("Error creating topic:", error);
  }
}

module.exports = { createGenders, createRelationship, createTopic };
