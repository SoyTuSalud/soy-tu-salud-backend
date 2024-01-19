import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class MotherForm {
  @Prop()
  lastMenstruationDate: Date;
  @Prop()
  prenatalControl: boolean;
  @Prop()
  background: boolean;
  @Prop()
  previousBirths: boolean;
  @Prop()
  currentPregnancy: boolean;
  @Prop()
  psychosocialRisk: boolean;
  @Prop()
  gynecobstetric: boolean;
  @Prop()
  nutritionAssessment: boolean;
  @Prop()
  psychologicalAssessment: boolean;
  @Prop()
  dentalAssessment: boolean;
  @Prop()
  vaccination: boolean;
  @Prop()
  painFreeChildbirthCourse: boolean;
  @Prop()
  folicAcid: boolean;
  @Prop()
  calcium: boolean;
  @Prop()
  ferrousSulfate: boolean;

  @Prop()
  syphilisLab: boolean;
  @Prop()
  vihLab: boolean;
  @Prop()
  hepatitisBLab: boolean;
  @Prop()
  urineCultureLab: boolean;
  @Prop()
  completeBloodCountLab: boolean;
  @Prop()
  bloodTypeLab: boolean;
  @Prop()
  bloodGlucoseLab: boolean;
  @Prop()
  iggRubella: boolean;
  @Prop()
  iggToxoplasma: boolean;
  @Prop()
  igmToxoplasma: boolean;
  @Prop()
  vaginalCytology: boolean;
  @Prop()
  ultrasound: boolean;
  @Prop()
  malariaLab: boolean;
  @Prop()
  elisaChagas: boolean;

  @Prop()
  babyLessThan2000g: boolean;
  @Prop()
  placentaPrevia: boolean;
  @Prop()
  pulmonaryEmbolism: boolean;
  @Prop()
  fetalMalformation: boolean;
  @Prop()
  cerebralIschemia: boolean;
  @Prop()
  babyHasComeOut: boolean;
  @Prop()
  moreThanTwoBabies: boolean;
  @Prop()
  epoc: boolean;
  @Prop()
  bloodDisorder: boolean;
  @Prop()
  autoimmuneDisease: boolean;
  @Prop()
  kidneyDisease: boolean;
  @Prop()
  drugAddiction: boolean;
  @Prop()
  alcoholism: boolean;
  @Prop()
  heartDisease: boolean;

  @Prop()
  abortion: boolean;
  @Prop()
  abnormalPelvis: boolean;
  @Prop()
  gynecologicalSurgery: boolean;
  @Prop()
  cervicalConization: boolean;
  @Prop()
  uterineSurgery: boolean;
  @Prop()
  withoutPrenatalCare: boolean;
  @Prop()
  diabetes: boolean;
  @Prop()
  unwantedPregnancy: boolean;
  @Prop()
  hypothyroidism: boolean;
  @Prop()
  placentalDisease: boolean;
  @Prop()
  infertility: boolean;
}

export const MotherFormSchema = SchemaFactory.createForClass(MotherForm);
