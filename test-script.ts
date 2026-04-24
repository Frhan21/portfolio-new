import { axiosInstance } from './lib/axios';

axiosInstance.interceptors.request.use((request) => {
  console.log('Sending request to:', request.baseURL + request.url);
  return request;
});

import { getProjects } from './server/actions/project-actions';

async function test() {
  try {
    const res = await getProjects(3);
    console.log('Success:', res);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

test();
