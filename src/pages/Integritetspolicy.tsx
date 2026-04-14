import { Link } from 'react-router-dom'

export default function Integritetspolicy() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-block rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Tillbaka till startsidan
        </Link>

        <div className="mt-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-rose-600">
            GDPR
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Integritetspolicy
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Hos Lillavitas Blommor värnar vi om din personliga integritet. Här förklarar vi hur vi
            samlar in, använder och skyddar personuppgifter när du kontaktar oss eller skickar en
            beställningsförfrågan via hemsidan.
          </p>

          <p className="mt-4 text-sm text-slate-500">Senast uppdaterad: 2026-04-14</p>
        </div>

        <div className="mt-12 space-y-10">
          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              1. Personuppgiftsansvarig
            </h2>
            <div className="mt-4 space-y-2 text-base leading-8 text-slate-600 sm:text-lg">
              <p>Lillavitas Blommor</p>
              <p>Centralgatan 14, 814 31 Skutskär</p>
              <p>Telefon: 026-704 67</p>
              <p>E-post: order@lillavitasblommor.se</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              2. Vilka personuppgifter vi samlar in
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
              Vi kan samla in namn, telefonnummer, e-postadress, meddelanden och annan information
              som du själv lämnar när du kontaktar oss eller skickar en beställningsförfrågan via
              hemsidan.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              3. Varför vi samlar in personuppgifter
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
              Vi behandlar dina personuppgifter för att kunna hantera beställningar, svara på
              frågor, kontakta dig om din förfrågan och ge god kundservice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              4. Hur länge vi sparar uppgifterna
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
              Vi sparar inte personuppgifter längre än nödvändigt för att hantera ditt ärende eller
              uppfylla rättsliga skyldigheter.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              5. Delning av personuppgifter
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
              Vi säljer aldrig dina personuppgifter. Uppgifter kan delas med tekniska tjänster som
              behövs för att driva webbplatsen och hantera kontaktförfrågningar, exempelvis
              e-posttjänster, webbhotell eller karttjänster.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              6. Dina rättigheter
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
              Du har rätt att begära information om vilka personuppgifter vi har om dig, begära
              rättelse av felaktiga uppgifter och i vissa fall få dina uppgifter raderade. Du har
              också rätt att lämna klagomål till Integritetsskyddsmyndigheten (IMY).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">7. Kontakt</h2>
            <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
              Har du frågor om hur vi behandlar personuppgifter är du välkommen att kontakta oss på
              order@lillavitasblommor.se.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}