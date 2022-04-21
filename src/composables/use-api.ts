import fetchApiService from '@/services/fetch-api-service';

export default function useApi() {
  const { fetchData } = fetchApiService();

  async function get(request:Request):Promise<Response> {
    const data = fetchData(request);
    return data;
  }

  return {
    get,
  };
}
