import { getCookie } from 'cookies-next';
import { defineAbility } from '@casl/ability';

type ModuleType = {
  userId: string;
  method: string;
  feature: string;
}[];

const data: string = getCookie('data')?.toString() || '';
const userModule: ModuleType = data && JSON?.parse(data)?.module;
const ability = defineAbility((can) => {
  for (let i = 0; i < userModule.length; i++) {
    can(userModule[i]?.method, userModule[i]?.feature);
  }
});

export { ability };
