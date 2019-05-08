import { Environment } from 'src/app/_interfaces/environment';
import { parseJson } from 'src/app/_servicios/shared-function.service';

export const environment: Environment = {
  production: true,
  url_api: 'http://localhost:7575/',
  name_sesion: parseJson()
};
