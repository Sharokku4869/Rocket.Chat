import { ServiceClass } from '../../sdk/types/ServiceClass';
import { IStreamer, STATUS_MAP } from '../../sdk/types/IStreamer';
// import { Notifications } from '../../../app/notifications/server';

export class Streamer extends ServiceClass implements IStreamer {
	protected name = 'streamer';

	private streamLogged: any;

	constructor(Streamer: any) {
		super();

		this.streamLogged = new Streamer('notify-logged');
		this.streamLogged.allowWrite('none');
		this.streamLogged.allowRead('logged');
	}

	sendDeleteCustomEmoji(emojiData: Record<string, any>): void {
		this.streamLogged.emit('deleteEmojiCustom', {
			emojiData,
		});
	}

	sendUpdateCustomEmoji(emojiData: Record<string, any>): void {
		this.streamLogged.emit('updateEmojiCustom', {
			emojiData,
		});
	}

	sendUserDeleted(uid: string): void {
		this.streamLogged.emit('Users:Deleted', {
			userId: uid,
		});
	}

	sendUserNameChanged(userData: Record<string, any>): void {
		this.streamLogged.emit('Users:NameChanged', userData);
	}

	sendDeleteCustomUserStatus(userStatusData: Record<string, any>): void {
		this.streamLogged.emit('deleteCustomUserStatus', {
			userStatusData,
		});
	}

	sendUpdateCustomUserStatus(userStatusData: Record<string, any>): void {
		this.streamLogged.emit('updateCustomUserStatus', {
			userStatusData,
		});
	}

	sendUserStatus({ uid, username, status, statusText }: { uid: string; username: string; status: STATUS_MAP; statusText?: string }): void {
		this.streamLogged.emit('user-status', [
			uid,
			username,
			status,
			statusText,
		]);
	}

	sendPermission({ clientAction, data }: any): void {
		this.streamLogged.emitWithoutBroadcast('permissions-changed', clientAction, data);
	}

	sendPrivateSetting({ clientAction, setting }: any): void {
		this.streamLogged.emitWithoutBroadcast('private-settings-changed', clientAction, setting);
	}

	sendUserAvatarUpdate({ username, etag }: { username: string; etag?: string }): void {
		this.streamLogged.emit('updateAvatar', {
			username,
			etag,
		});
	}

	sendRoomAvatarUpdate({ rid, etag }: { rid: string; etag?: string }): void {
		this.streamLogged.emit('updateAvatar', {
			rid,
			etag,
		});
	}

	sendRoleUpdate(update: Record<string, any>): void {
		this.streamLogged.emit('roles-change', update);
	}

	notifyAll(eventName: string, ...args: any[]): void {
		console.log('notifyAll', eventName, args);
	}

	notifyUser(uid: string, eventName: string, ...args: any[]): void {
		console.log('notifyUser', uid, eventName, args);
	}
}
