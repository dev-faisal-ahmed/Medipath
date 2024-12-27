import { AddService } from './add-service/add-service';

export function ServicesPage() {
  return (
    <main className="p-6">
      <section className="flex items-center justify-end">
        <AddService />
      </section>
    </main>
  );
}
