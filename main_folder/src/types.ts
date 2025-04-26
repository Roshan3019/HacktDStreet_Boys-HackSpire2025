export interface ServiceCenter {
  id: number;
  name: string;
  address: string;
  waitTime: string;
  category?: string;
  image?: string;
}

export interface Service {
  id: number;
  name: string;
  duration: string;
  price: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface Booking {
  center: string;
  service: string;
  date: string;
  time: string;
  predictedWait: string;
  status: string;
}

export interface Stat {
  title: string;
  value: string;
  icon: string;
  color: string;
  bg: string;
}
