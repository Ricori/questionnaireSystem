import { getCookie } from '../utils/helper'
import router from 'umi/router';

const index = function () {
  const utoken = getCookie('utoken');
  if (!utoken) {
    router.push('/login/');
  } else {
    router.push('/panel/');
  }
}

export default index;