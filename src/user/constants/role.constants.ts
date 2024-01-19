export enum Role {
  MOTHER = 'MOTHER',
  PHILANTHROPIST = 'PHILANTHROPIST',
  PROVIDER = 'PROVIDER',
  ADMIN = 'ADMIN'
}

/**
@Schema()
class Role {
  @Prop({
    type: String,
    maxlength: 254,
  })
  role: string

  @Prop({
    type: String,
    unique: true,
  })
  code: string
}

Role.pre('validate', async function () {
  if (!this.code) {
    const nextSeq = await getNextSequence('roles');
    this.code = nextSeq;
  }
});

export type RoleDocument = Role & Document;

export const RoleSchema = SchemaFactory.createForClass(Role);
*/
