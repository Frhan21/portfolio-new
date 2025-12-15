import { Certificate } from '@/model/Certificate';

interface CertificateResponse {
  message: string;
  data: Certificate[];
}

const API_BASE_PATH = '/api/v1/certificate';

// get Certificates
export const getCertificates = async (): Promise<CertificateResponse> => {
  const res = await fetch(`${API_BASE_PATH}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch certificates');
  }

  const data: CertificateResponse = await res.json();
  return {
    data: data.data ?? [],
    message: data.message,
  };
};

export const getCertificateById = async (id: string): Promise<Certificate> => {
  const url = `${API_BASE_PATH}/${id}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch certificate');
  }

  const data: Certificate = await res.json();
  return {
    ...data,
  };
};
