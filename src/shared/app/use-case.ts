import { Request } from '@shared/app/requests';
import { Response } from '@shared/app/response';

export interface UseCase {
  execute(request: Request): Promise<Response | void>;
}
