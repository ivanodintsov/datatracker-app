import mongoose from 'mongoose';
import { MessageEntitySchema } from '../MessageEntity';
import { AudioSchema } from '../Audio';
import { VoiceSchema } from '../Voice';
import { DocumentSchema } from '../Document';
import { PhotoSizeScheme } from '../PhotoSize';
import { VideoSchema } from '../Video';
import { VideoNoteSchema } from '../VideoNote';
import { ContactSchema } from '../Contact';
import { LocationSchema } from '../Location';
import { VenueSchema } from '../Venue';
import { GameSchema } from '../Game';
import { InvoiceSchema } from '../Invoice';
import { createUserSchema } from '../User';

const Types = mongoose.Schema.Types;

const MessageSticker = new mongoose.Schema({
  file_id: {
    type: String,
    required: true
  },
  set_name: {
    type: String
  }
}, { _id: false });

const UserSchema = createUserSchema({}, { _id: false });

const createMessageSchema = () => new mongoose.Schema(
  {
    message_id: { type: Number, required: true },
    from: { type: Number },
    date: { type: Date, required: true },
    chat: { type: Types.Long, required: true },
    forward_from: { type: Number },
    forward_from_chat: { type: Types.Long },
    forward_from_message_id: { type: Number },
    forward_signature: { type: String },
    forward_date: { type: Date },
    reply_to_message: { type: Number },
    edit_date: { type: Date },
    media_group_id: { type: String },
    author_signature: { type: String },
    text: { type: String },
    entities: { type: [MessageEntitySchema] },
    caption_entities: { type: [MessageEntitySchema] },
    audio: { type: AudioSchema },
    document: { type: DocumentSchema },
    game: { type: GameSchema },
    photo: [PhotoSizeScheme],
    sticker: { type: MessageSticker },
    video: { type: VideoSchema },
    voice: { type: VoiceSchema },
    video_note: { type: VideoNoteSchema },
    caption: { type: String },
    contact: { type: ContactSchema },
    location: { type: LocationSchema },
    venue: { type: VenueSchema },
    new_chat_members: { type: [UserSchema] },
    left_chat_member: { type: UserSchema },
    new_chat_title: { type: String },
    new_chat_photo: { type: [PhotoSizeScheme] },
    delete_chat_photo: { type: Boolean },
    group_chat_created: { type: Boolean },
    supergroup_chat_created: { type: Boolean },
    channel_chat_created: { type: Boolean },
    migrate_to_chat_id: { type: Number },
    migrate_from_chat_id: { type: Number },
    pinned_message: { type: Number },
    invoice: { type: InvoiceSchema },
    connected_website: { type: String }
  },
  {
    timestamps: true
  }
);

export default createMessageSchema;
