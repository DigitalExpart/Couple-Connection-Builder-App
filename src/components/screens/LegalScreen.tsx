import { ArrowLeft, Mail, Shield, FileText, ExternalLink } from 'lucide-react';

interface LegalScreenProps {
  onBack: () => void;
  type: 'privacy' | 'terms' | 'contact';
}

export function LegalScreen({ onBack, type }: LegalScreenProps) {
  if (type === 'contact') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 pb-20">
        {/* Header */}
        <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 px-6 pt-12 pb-8">
          <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl text-white mb-2">Contact & Support</h1>
          <p className="text-white/90">We're here to help</p>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Contact Options */}
          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <Mail className="w-5 h-5 text-rose-600" />
              <h3 className="text-lg text-gray-900">Get in Touch</h3>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:support@mymatchiq.com"
                className="block p-5 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl border border-rose-100 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-rose-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-1">Email Support</h4>
                    <p className="text-sm text-gray-600">support@mymatchiq.com</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                </div>
              </a>

              <div className="p-5 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-100">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">💡</div>
                  <div>
                    <h4 className="text-gray-900 mb-1">Response Time</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      We typically respond within 24-48 hours. For urgent issues with Premium or Exclusive subscriptions, we prioritize faster responses.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <h3 className="text-lg text-gray-900 mb-4">Common Questions</h3>
            <div className="space-y-4">
              <div className="pb-4 border-b border-gray-100">
                <h4 className="text-gray-900 mb-2">How do I delete my data?</h4>
                <p className="text-sm text-gray-600">
                  You can delete individual scans from the History screen. To delete all data, email us at support@mymatchiq.com
                </p>
              </div>
              <div className="pb-4 border-b border-gray-100">
                <h4 className="text-gray-900 mb-2">Is my data private?</h4>
                <p className="text-sm text-gray-600">
                  Yes! All scans are stored locally on your device. We don't store or transmit any personal scan data.
                </p>
              </div>
              <div>
                <h4 className="text-gray-900 mb-2">How do I cancel my subscription?</h4>
                <p className="text-sm text-gray-600">
                  Visit your Profile → Manage Subscription to cancel anytime. Your access continues until the end of your billing period.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 px-6 pt-12 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="text-2xl text-white mb-2">
          {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
        </h1>
        <p className="text-white/90">Last updated: November 24, 2025</p>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Important Notice */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-3xl border-2 border-amber-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-amber-900 mb-2">Important Notice</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                This is an MVP version. Before any public launch, full legal documents will be implemented. 
                This app is not intended for collecting PII or securing sensitive data.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <div className="prose prose-sm max-w-none">
            {type === 'privacy' ? (
              <div className="space-y-6 text-gray-700">
                <section>
                  <h3 className="text-lg text-gray-900 mb-3">Data Collection & Storage</h3>
                  <p className="leading-relaxed mb-3">
                    MyMatchIQ is designed with privacy as a priority. Currently, in this MVP version:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>All scan data is stored locally in your browser</li>
                    <li>No data is transmitted to external servers</li>
                    <li>Clearing browser data will delete all scans</li>
                    <li>No account authentication is currently implemented</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg text-gray-900 mb-3">What We DON'T Collect</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Personal identifiable information (PII)</li>
                    <li>Location data</li>
                    <li>Device information</li>
                    <li>Usage analytics</li>
                    <li>Cookies or tracking data</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg text-gray-900 mb-3">Future Updates</h3>
                  <p className="leading-relaxed">
                    Before any public launch or authentication implementation, this policy will be updated to include:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Data encryption methods</li>
                    <li>Server storage policies</li>
                    <li>Account deletion procedures</li>
                    <li>GDPR and CCPA compliance details</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg text-gray-900 mb-3">Contact</h3>
                  <p className="leading-relaxed">
                    For privacy questions, email:{' '}
                    <a href="mailto:privacy@mymatchiq.com" className="text-rose-600 underline">
                      privacy@mymatchiq.com
                    </a>
                  </p>
                </section>
              </div>
            ) : (
              <div className="space-y-6 text-gray-700">
                <section>
                  <h3 className="text-lg text-gray-900 mb-3">Acceptance of Terms</h3>
                  <p className="leading-relaxed">
                    By using MyMatchIQ, you agree to these terms. This is an MVP (Minimum Viable Product) 
                    for testing and development purposes.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg text-gray-900 mb-3">Service Description</h3>
                  <p className="leading-relaxed mb-3">
                    MyMatchIQ provides compatibility assessment tools for dating and relationships:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Guided question frameworks for evaluating connections</li>
                    <li>Compatibility scoring based on responses</li>
                    <li>Personal notes and organizational tools</li>
                    <li>Educational resources about healthy relationships</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg text-gray-900 mb-3">Important Disclaimers</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Not Professional Advice:</strong> This app does not provide professional relationship counseling, therapy, or mental health services</li>
                    <li><strong>Educational Tool:</strong> Results are for informational purposes only</li>
                    <li><strong>Personal Responsibility:</strong> Users are responsible for their own dating and relationship decisions</li>
                    <li><strong>No Guarantees:</strong> We don't guarantee any specific outcomes or relationship success</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg text-gray-900 mb-3">Subscription Terms</h3>
                  <p className="leading-relaxed mb-3">
                    For Premium and Exclusive tiers:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Subscriptions renew automatically</li>
                    <li>Cancel anytime through your profile</li>
                    <li>Refunds handled on a case-by-case basis</li>
                    <li>Pricing subject to change with notice</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg text-gray-900 mb-3">Prohibited Uses</h3>
                  <p className="leading-relaxed mb-3">
                    You may not:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Use the service to harm, harass, or stalk others</li>
                    <li>Share others' private information without consent</li>
                    <li>Violate any applicable laws</li>
                    <li>Attempt to reverse engineer the service</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg text-gray-900 mb-3">Limitation of Liability</h3>
                  <p className="leading-relaxed">
                    MyMatchIQ and its creators are not liable for any decisions made based on app results. 
                    This tool is meant to support your judgment, not replace it.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg text-gray-900 mb-3">Changes to Terms</h3>
                  <p className="leading-relaxed">
                    We reserve the right to modify these terms. Significant changes will be communicated to users.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg text-gray-900 mb-3">Contact</h3>
                  <p className="leading-relaxed">
                    Questions about terms?{' '}
                    <a href="mailto:legal@mymatchiq.com" className="text-rose-600 underline">
                      legal@mymatchiq.com
                    </a>
                  </p>
                </section>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3">
          {type === 'privacy' ? (
            <button
              onClick={onBack}
              className="flex-1 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              I Understand
            </button>
          ) : (
            <button
              onClick={onBack}
              className="flex-1 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              I Agree
            </button>
          )}
        </div>
      </div>
    </div>
  );
}