import moment from 'moment';
import { AuthService } from '../security/auth.service';

export class User {
  id!: number;
}

export class Activity {
  id!: number;
  type!: 'CAMINHADA';
  date!: Date;
  distance!: number;
  duration!: number;
  user!: User;

  constructor(user_id: number){
    this.user = new User();
    this.user.id = user_id
  }

  static toJson(activity: Activity): any {
    return {
      id: activity.id,
      type: activity.type,
      date: moment(activity.date).format('DD/MM/YYYY'),
      distance: activity.distance,
      duration: activity.duration,
      user: activity.user
    }
  }
}
