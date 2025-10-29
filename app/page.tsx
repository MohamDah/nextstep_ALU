import Image from 'next/image';
import Link from 'next/link';
import logoImage from '@/public/logo_transparent.png'
import heroFigure from "@/public/hero_figure.png"
import KFaisalLogo from "@/public/KFaisalLogo.png"
import unicefLogo from "@/public/unicefLogo.png"
import visaLogo from "@/public/visaLogo.png"
import mastercardLogo from "@/public/mastercardLogo.png"
import momoLogo from "@/public/momoLogo.png"

export default function Home() {
  return (
    <div className="min-h-screen bg-shifa-bg">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Image
                src={logoImage}
                alt="ShifaLink Logo"
                className="h-10 w-auto scale-125"
              />
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="#how-it-works" className="text-shifa-text hover:text-shifa-blue transition-colors">
                How It Works
              </Link>
              <Link href="#impact" className="text-shifa-text hover:text-shifa-blue transition-colors">
                Our Impact
              </Link>
              <Link href="#partnerships" className="text-shifa-text hover:text-shifa-blue transition-colors">
                Partnerships
              </Link>
            </nav>
            <div className="flex space-x-4">
              <button className="bg-shifa-blue text-white px-6 py-2 rounded-lg hover:bg-shifa-blue-700 transition-colors">
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-shifa-blue-50 to-shifa-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Fund a Life, Track the Impact:
                <span className="text-shifa-blue block">
                  Transparent Medical Aid for Rwanda
                </span>
              </h1>
              <p className="text-xl text-shifa-text mb-8">
                Connecting Donors & Hospitals Directly, Securely.
              </p>
              <div className="flex space-x-4">
                <button className="bg-shifa-blue text-white px-8 py-3 rounded-lg text-lg hover:bg-shifa-blue-700 transition-colors">
                  View Patient Stories
                </button>
                <button className="border-2 border-shifa-blue text-shifa-blue px-8 py-3 rounded-lg text-lg hover:bg-shifa-blue hover:text-white transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl">
                <Image
                  src={heroFigure}
                  alt="Medical care in Rwanda"
                  className="rounded-xl w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-shifa-text max-w-3xl mx-auto">
              100% Direct: Your Donation Goes Straight to the Hospital
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-shifa-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-12 h-12 bg-shifa-green rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Hospital Posts Verified Case</h3>
              <p className="text-shifa-text">
                Verified medical cases are posted with complete transparency
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-shifa-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-12 h-12 bg-shifa-blue rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Donor Chooses & Pays Directly</h3>
              <p className="text-shifa-text">
                Choose a case and send funds directly to the hospital securely
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-shifa-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-12 h-12 bg-shifa-green rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Hospital Provides Treatment</h3>
              <p className="text-shifa-text">
                Medical treatment is provided with real-time updates
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-shifa-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-12 h-12 bg-shifa-blue rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">4</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Donor Receives Verified Report</h3>
              <p className="text-shifa-text">
                Get detailed reports on how your donation was used
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Promise Section */}
      <section className="py-20 bg-shifa-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Promise</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-shifa-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-shifa-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Full Transparency</h3>
              <p className="text-shifa-text text-lg">
                No Intermediaries
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-shifa-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-shifa-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Verified Impact</h3>
              <p className="text-shifa-text text-lg">
                Real Patient Stories
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8">
                <div className="flex items-center space-x-2">
                  <Image
                    src={KFaisalLogo}
                    alt="Hospital Verified"
                    width={40}
                    height={40}
                  />
                  <span className="text-sm text-shifa-text">King Faisal Hospital</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Image
                    src={unicefLogo}
                    alt="UNICEF"
                    width={40}
                    height={40}
                  />
                  <span className="text-sm text-shifa-text">UNICEF</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Image
                    src={visaLogo}
                    alt="Visa"
                    width={40}
                    height={40}
                  />
                  <span className="text-sm text-shifa-text">Visa</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Image
                    src={mastercardLogo}
                    alt="Mastercard"
                    width={40}
                    height={40}
                  />
                  <span className="text-sm text-shifa-text">Mastercard</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Image
                    src={momoLogo}
                    alt="Mastercard"
                    width={40}
                    height={40}
                  />
                  <span className="text-sm text-shifa-text">Mobile Money</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Image
                src={logoImage}
                alt="ShifaLink Logo"
                width={150}
                height={40}
                className="h-14 w-auto mb-4"
              />
              <p className="text-gray-400">
                Direct and secure medical aid connections between donors and hospitals in Rwanda.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Terms</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">
                There are a message verification by doing text around their fields.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
