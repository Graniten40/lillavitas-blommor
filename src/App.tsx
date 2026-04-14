import React, { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Link } from 'react-router-dom'

type FormData = {
  name: string
  phone: string
  email: string
  date: string
  orderType: string
  budget: string
  recipient: string
  deliveryMethod: string
  contactMethod: string
  cardMessage: string
  message: string
  company: string
  privacyAccepted: boolean
}

export default function App() {
  const galleryImages = [
    {
      src: 'https://images.unsplash.com/photo-1526397751294-331021109fbd?auto=format&fit=crop&w=1200&q=80',
      alt: 'Färgglad bukett med snittblommor',
    },
    {
      src: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=80',
      alt: 'Rosa och vita blommor i butiksmiljö',
    },
    {
      src: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=1200&q=80',
      alt: 'Närbild på bukett med rosor och gröna blad',
    },
  ]

  const initialFormData: FormData = {
    name: '',
    phone: '',
    email: '',
    date: '',
    orderType: 'Bukett',
    budget: '',
    recipient: '',
    deliveryMethod: 'Hämtas i butik',
    contactMethod: 'Telefon',
    cardMessage: '',
    message: '',
    company: '',
    privacyAccepted: false,
  }

  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [submitted, setSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [formLoadedAt, setFormLoadedAt] = useState<number>(Date.now())
  const [privacyError, setPrivacyError] = useState(false)

  useEffect(() => {
    setFormLoadedAt(Date.now())
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    const checked = e.target instanceof HTMLInputElement ? e.target.checked : false

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    if (name === 'privacyAccepted' && e.target instanceof HTMLInputElement && e.target.checked) {
      setPrivacyError(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSubmitted(false)
    setErrorMessage('')
    setPrivacyError(false)

    if (isSending) return

    // Honeypot-skydd
    if (formData.company.trim() !== '') {
      setErrorMessage('Formuläret kunde inte skickas.')
      return
    }

    // Tidskontroll: stoppa för snabba submits
    const secondsOnPage = (Date.now() - formLoadedAt) / 1000
    if (secondsOnPage < 4) {
      setErrorMessage('Formuläret skickades för snabbt. Försök igen om en liten stund.')
      return
    }

    // Enkel spamkontroll: för många länkar i texten
    const linkCount = (formData.message.match(/http/gi) || []).length
    if (linkCount > 2) {
      setErrorMessage('Meddelandet verkar inte giltigt.')
      return
    }

    // GDPR-checkbox
    if (!formData.privacyAccepted) {
      setPrivacyError(true)
      setErrorMessage('Du måste godkänna integritetspolicyn för att kunna skicka formuläret.')
      return
    }

    setIsSending(true)

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          date: formData.date,
          orderType: formData.orderType,
          budget: formData.budget,
          recipient: formData.recipient,
          deliveryMethod: formData.deliveryMethod,
          contactMethod: formData.contactMethod,
          cardMessage: formData.cardMessage,
          message: formData.message,
        },
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      )

      setSubmitted(true)
      setFormData(initialFormData)
      setFormLoadedAt(Date.now())
    } catch (error) {
      console.error('EmailJS error:', error)
      setErrorMessage('Något gick fel när förfrågan skulle skickas. Försök igen.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xl font-semibold tracking-tight">Lillavitas Blommor</p>
            <p className="text-sm text-slate-500">Skutskär</p>
          </div>

          <nav className="hidden gap-6 text-sm md:flex">
            <a href="#om-oss" className="transition hover:text-slate-950">
              Om oss
            </a>
            <a href="#bestallning" className="transition hover:text-slate-950">
              Beställning
            </a>
            <a href="#galleri" className="transition hover:text-slate-950">
              Galleri
            </a>
            <a href="#kontakt" className="transition hover:text-slate-950">
              Kontakt
            </a>
          </nav>

          <a
            href="#bestallning"
            className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
          >
            Skicka förfrågan
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-emerald-50" />
          <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8">
            <div className="flex flex-col justify-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-rose-600">
                Blommor för livets stunder
              </p>
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Vackra buketter och personliga blomsterbeställningar i Skutskär.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Hos Lillavitas Blommor kan kunder skicka en beställningsförfrågan direkt via
                hemsidan. Butiken återkommer sedan via telefon, sms eller e-post.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#bestallning"
                  className="rounded-2xl bg-slate-900 px-6 py-3 text-center text-sm font-medium text-white shadow-sm transition hover:opacity-90"
                >
                  Beställ blommor
                </a>
                <a
                  href="#kontakt"
                  className="rounded-2xl border border-slate-300 px-6 py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Kontakta butiken
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=1400&q=80"
                  alt="Blombukett i närbild"
                  className="h-full min-h-[320px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="om-oss" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-rose-600">
                Om butiken
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                En lokal blomsterbutik med personlig service
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                Som en del av vårt erbjudande förmedlar vi nu blommor genom Interflora, så att du
                kan skicka blommor smidigt och tryggt till någon du tycker om.
              </p>

              <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=80"
                  alt="Blommor i butiksmiljö"
                  className="h-[260px] w-full object-cover sm:h-[320px]"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [
                  'Personlig service',
                  'Vi hjälper dig att välja rätt blommor för födelsedag, kärlek, sorg eller andra speciella tillfällen.',
                ],
                [
                  'Beställ enkelt',
                  'Skicka din förfrågan direkt via sidan så återkommer vi snabbt och hjälper dig vidare.',
                ],
                [
                  'Interflora-förmedling',
                  'Beställ blommor tryggt genom oss även via Interflora för leverans till nära och kära.',
                ],
                [
                  'Blommor för alla tillfällen',
                  'Buketter och arrangemang för vardag, fest, bröllop, begravning och personliga gåvor.',
                ],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="flex min-h-[210px] flex-col justify-center rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center shadow-sm"
                >
                  <h3 className="text-base font-semibold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="bestallning" className="bg-slate-50 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-rose-600">
                Beställningsförfrågan
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                Skicka en förfrågan till butiken
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Fyll i formuläret med dina önskemål så återkommer vi så snart som möjligt för att
                bekräfta din beställning.
              </p>
            </div>

            {submitted && (
              <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                Tack! Din förfrågan har skickats. Vi återkommer så snart som möjligt.
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="grid gap-5 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Namn</label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="För- och efternamn"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Telefonnummer
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="070-123 45 67"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">E-post</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="namn@email.se"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Önskat datum</label>
                <input
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Typ av beställning
                </label>
                <select
                  name="orderType"
                  value={formData.orderType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                >
                  <option>Bukett</option>
                  <option>Begravningsblommor</option>
                  <option>Bröllopsblommor</option>
                  <option>Present / uppvaktning</option>
                  <option>Annat</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Budget</label>
                <input
                  name="budget"
                  type="text"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="Till exempel 300–500 kr"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Till vem är beställningen?
                </label>
                <input
                  name="recipient"
                  type="text"
                  value={formData.recipient}
                  onChange={handleChange}
                  placeholder="Till exempel mamma, vän eller företag"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Hämtas i butik eller levereras?
                </label>
                <select
                  name="deliveryMethod"
                  value={formData.deliveryMethod}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                >
                  <option>Hämtas i butik</option>
                  <option>Levereras</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Önskat kontaktsätt
                </label>
                <select
                  name="contactMethod"
                  value={formData.contactMethod}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                >
                  <option>Telefon</option>
                  <option>SMS</option>
                  <option>E-post</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Kort till blomman
                </label>
                <input
                  name="cardMessage"
                  type="text"
                  value={formData.cardMessage}
                  onChange={handleChange}
                  placeholder="Skriv en hälsning som ska följa med"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Övrig information
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Beskriv gärna färger, stil, blomtyper eller annan viktig information"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
                />
              </div>

              <div className="hidden" aria-hidden="true">
                <label htmlFor="company">Företag</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  autoComplete="off"
                  tabIndex={-1}
                  className="hidden"
                />
              </div>

              <div className="md:col-span-2">
                <div
                  className={`rounded-2xl border px-4 py-3 transition ${
                    privacyError ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <label
                    className={`flex items-start gap-3 text-sm leading-6 ${
                      privacyError ? 'text-red-700' : 'text-slate-600'
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="privacyAccepted"
                      checked={formData.privacyAccepted}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                    />
                    <span>
                      Jag har läst och godkänner{' '}
                      <Link
                        to="/integritetspolicy"
                        className="font-medium text-slate-900 underline underline-offset-2"
                      >
                        integritetspolicyn
                      </Link>
                      .
                    </span>
                  </label>

                  {privacyError && (
                    <p className="mt-2 text-sm text-red-700">
                      Du måste godkänna integritetspolicyn innan du kan skicka formuläret.
                    </p>
                  )}
                </div>
              </div>

              <div className="md:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-6 text-slate-500">
                  Skicka din förfrågan så återkommer butiken via telefon, sms eller e-post.
                  <br />
                  När du skickar formuläret behandlar vi dina personuppgifter endast för att kunna kontakta dig om din förfrågan.
                </p>
                <button
                  type="submit"
                  disabled={isSending}
                  className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSending ? 'Skickar...' : 'Skicka förfrågan'}
                </button>
              </div>
            </form>
          </div>
        </section>

        <section id="galleri" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-rose-600">Galleri</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              Inspiration från butiken
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Byt ut dessa exempelbilder mot riktiga bilder från Lillavitas Blommor för att göra
              sidan mer personlig och trovärdig.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {galleryImages.map((image) => (
              <div
                key={image.src}
                className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm"
              >
                <img src={image.src} alt={image.alt} className="h-72 w-full object-cover" />
              </div>
            ))}
          </div>
        </section>

        <section id="kontakt" className="bg-slate-900 py-16 text-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-rose-300">Kontakt</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Vi hjälper dig att hitta rätt blommor
              </h2>
              <div className="mt-6 space-y-3 text-base leading-7 text-slate-300">
                <p>
                  <span className="font-semibold text-white">Adress:</span> Centralgatan 14, 814 31
                  Skutskär
                </p>
                <p>
                  <span className="font-semibold text-white">Telefon:</span> 026-704 67
                </p>
                <p>
                  <span className="font-semibold text-white">E-post:</span>{' '}
                  order@lillavitasblommor.se
                </p>
                <div>
                  <p className="font-semibold text-white">Öppettider:</p>
                  <p>Måndag–fredag: 10.00–18.00</p>
                  <p>Lördag: 10.00–14.00</p>
                  <p>Söndag: Stängt</p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Centralgatan+14,+814+31+Skutskär"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-block rounded-2xl bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:opacity-90"
                  >
                    Öppna i Google Maps
                  </a>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl">
              <iframe
                title="Karta till Lillavitas Blommor"
                src="https://www.google.com/maps?q=Centralgatan+14,+814+31+Skutskär&output=embed"
                width="100%"
                height="360"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© 2026 Lillavitas Blommor. Alla rättigheter förbehållna.</p>
          <div className="flex gap-4">
            <a
              href="https://facebook.com/LillaVita"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-slate-900"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com/lillavitasblommor"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-slate-900"
            >
              Instagram
            </a>
          </div>
          <Link to="/integritetspolicy" className="transition hover:text-slate-900">
            Integritetspolicy
          </Link>
        </div>
      </footer>
    </div>
  )
}