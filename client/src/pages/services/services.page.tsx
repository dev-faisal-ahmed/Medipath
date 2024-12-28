import { Header } from '@/providers/header/header.provider';
import { AddService } from './add-service';

export function ServicesPage() {
  return (
    <>
      <Header title="Service">
        <AddService />
      </Header>
      <main className="p-6">
        <section className="flex items-center justify-end"></section>
      </main>
    </>
  );
}
