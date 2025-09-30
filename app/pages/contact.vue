<!-- pages/contact.vue -->
<template>
  <div>
    <!-- Hero Section -->
    <CommonHero
      title="Get In Touch"
      subtitle="Let's Build Something Amazing Together"
      description="Have a project in mind or just want to chat? I'd love to hear from you. Fill out the form below and I'll get back to you within 24 hours."
      badge="Usually responds within 24 hours"
      :show-scroll-indicator="false"
      :stats="[
        { value: '24h', label: 'Response Time' },
        { value: '50+', label: 'Happy Clients' },
        { value: '100%', label: 'Satisfaction Rate' }
      ]"
    />

    <!-- Main Content with Sidebar -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Main Content - Contact Form (2/3 width) -->
          <div class="lg:col-span-2">
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <!-- Form Header -->
              <div class="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-700 dark:to-gray-600 px-8 py-6 border-b border-gray-200 dark:border-gray-600">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Send Me a Message
                </h2>
                <p class="text-gray-600 dark:text-gray-300">
                  Fill out the form below and I'll get back to you as soon as possible.
                </p>
              </div>

              <!-- Contact Form -->
              <form @submit.prevent="handleSubmit" class="p-8 space-y-6">
                
                <!-- Name Field -->
                <div>
                  <label 
                    for="name" 
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Full Name <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    placeholder="John Doe"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    :class="{ 'border-red-500 dark:border-red-500': errors.name }"
                    @blur="validateField('name')"
                  />
                  <p v-if="errors.name" class="mt-1 text-sm text-red-600 dark:text-red-400">
                    {{ errors.name }}
                  </p>
                </div>

                <!-- Email Field -->
                <div>
                  <label 
                    for="email" 
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email Address <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="john@example.com"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    :class="{ 'border-red-500 dark:border-red-500': errors.email }"
                    @blur="validateField('email')"
                  />
                  <p v-if="errors.email" class="mt-1 text-sm text-red-600 dark:text-red-400">
                    {{ errors.email }}
                  </p>
                </div>

                <!-- Phone Field (Optional) -->
                <div>
                  <label 
                    for="phone" 
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Phone Number <span class="text-gray-400 text-xs">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    placeholder="+44 123 456 7890"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  />
                </div>

                <!-- Company Field (Optional) -->
                <div>
                  <label 
                    for="company" 
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Company / Organisation <span class="text-gray-400 text-xs">(optional)</span>
                  </label>
                  <input
                    id="company"
                    v-model="form.company"
                    type="text"
                    placeholder="Your Company Ltd"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  />
                </div>

                <!-- Subject/Inquiry Type -->
                <div>
                  <label 
                    for="subject" 
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    What can I help you with? <span class="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    v-model="form.subject"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    :class="{ 'border-red-500 dark:border-red-500': errors.subject }"
                    @blur="validateField('subject')"
                  >
                    <option value="">Select an option...</option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-app">Mobile App Development</option>
                    <option value="consultation">Technical Consultation</option>
                    <option value="ui-ux-design">UI/UX Design</option>
                    <option value="maintenance">Website Maintenance</option>
                    <option value="general">General Enquiry</option>
                    <option value="other">Other</option>
                  </select>
                  <p v-if="errors.subject" class="mt-1 text-sm text-red-600 dark:text-red-400">
                    {{ errors.subject }}
                  </p>
                </div>

                <!-- Budget Range -->
                <div>
                  <label 
                    for="budget" 
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Project Budget <span class="text-gray-400 text-xs">(optional)</span>
                  </label>
                  <select
                    id="budget"
                    v-model="form.budget"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Prefer not to say</option>
                    <option value="under-5k">Under £5,000</option>
                    <option value="5k-10k">£5,000 - £10,000</option>
                    <option value="10k-25k">£10,000 - £25,000</option>
                    <option value="25k-50k">£25,000 - £50,000</option>
                    <option value="50k-plus">£50,000+</option>
                  </select>
                </div>

                <!-- Timeline -->
                <div>
                  <label 
                    for="timeline" 
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Project Timeline <span class="text-gray-400 text-xs">(optional)</span>
                  </label>
                  <select
                    id="timeline"
                    v-model="form.timeline"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Not sure yet</option>
                    <option value="asap">ASAP (Rush job)</option>
                    <option value="1-2-weeks">1-2 weeks</option>
                    <option value="1-month">1 month</option>
                    <option value="2-3-months">2-3 months</option>
                    <option value="3-6-months">3-6 months</option>
                    <option value="6-plus-months">6+ months</option>
                    <option value="flexible">Flexible timeline</option>
                  </select>
                </div>

                <!-- Message Field -->
                <div>
                  <label 
                    for="message" 
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Your Message <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    rows="6"
                    placeholder="Tell me about your project, goals, and any specific requirements..."
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                    :class="{ 'border-red-500 dark:border-red-500': errors.message }"
                    @blur="validateField('message')"
                  ></textarea>
                  <div class="flex justify-between mt-1">
                    <p v-if="errors.message" class="text-sm text-red-600 dark:text-red-400">
                      {{ errors.message }}
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400 ml-auto">
                      {{ form.message.length }} / 1000
                    </p>
                  </div>
                </div>

                <!-- How did you hear about me? -->
                <div>
                  <label 
                    for="referral" 
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    How did you hear about me? <span class="text-gray-400 text-xs">(optional)</span>
                  </label>
                  <select
                    id="referral"
                    v-model="form.referral"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select an option...</option>
                    <option value="google">Google Search</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="github">GitHub</option>
                    <option value="referral">Referral from a friend</option>
                    <option value="portfolio">Your portfolio website</option>
                    <option value="social-media">Social Media</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <!-- Consent Checkbox -->
                <div>
                  <label class="flex items-start space-x-3 cursor-pointer">
                    <input
                      v-model="form.consent"
                      type="checkbox"
                      class="mt-1 w-5 h-5 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700"
                      :class="{ 'border-red-500 dark:border-red-500': errors.consent }"
                    />
                    <span class="text-sm text-gray-700 dark:text-gray-300">
                      I agree to the 
                      <NuxtLink to="/privacy" class="text-primary-600 dark:text-primary-400 hover:underline">
                        privacy policy
                      </NuxtLink>
                      and consent to my data being processed for the purpose of this enquiry. 
                      <span class="text-red-500">*</span>
                    </span>
                  </label>
                  <p v-if="errors.consent" class="mt-1 ml-8 text-sm text-red-600 dark:text-red-400">
                    {{ errors.consent }}
                  </p>
                </div>

                <!-- Newsletter Subscription (Optional) -->
                <div>
                  <label class="flex items-start space-x-3 cursor-pointer">
                    <input
                      v-model="form.newsletter"
                      type="checkbox"
                      class="mt-1 w-5 h-5 text-primary-600 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700"
                    />
                    <span class="text-sm text-gray-700 dark:text-gray-300">
                      I'd like to receive updates about new projects, articles, and services (you can unsubscribe anytime).
                    </span>
                  </label>
                </div>

                <!-- Submit Button -->
                <div class="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    :disabled="submitting"
                    class="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <UIcon 
                      v-if="submitting" 
                      name="i-heroicons-arrow-path" 
                      class="h-5 w-5 animate-spin" 
                    />
                    <UIcon 
                      v-else 
                      name="i-heroicons-paper-airplane" 
                      class="h-5 w-5" 
                    />
                    <span>{{ submitting ? 'Sending...' : 'Send Message' }}</span>
                  </button>
                  
                  <button
                    type="button"
                    @click="resetForm"
                    class="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors duration-200"
                  >
                    Reset
                  </button>
                </div>

                <!-- Success Message -->
                <div 
                  v-if="submitted" 
                  class="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start space-x-3"
                >
                  <UIcon name="i-heroicons-check-circle" class="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 class="font-semibold text-green-900 dark:text-green-100">
                      Message sent successfully!
                    </h3>
                    <p class="text-sm text-green-700 dark:text-green-300 mt-1">
                      Thank you for your message. I'll get back to you within 24 hours at {{ form.email }}.
                    </p>
                  </div>
                </div>

                <!-- Error Message -->
                <div 
                  v-if="submitError" 
                  class="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-3"
                >
                  <UIcon name="i-heroicons-exclamation-triangle" class="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 class="font-semibold text-red-900 dark:text-red-100">
                      Failed to send message
                    </h3>
                    <p class="text-sm text-red-700 dark:text-red-300 mt-1">
                      {{ submitError }}
                    </p>
                  </div>
                </div>

              </form>
            </div>
          </div>

          <!-- Sidebar (1/3 width) -->
          <aside class="lg:col-span-1 space-y-6">
            
            <!-- Contact Information Widget -->
            <div class="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 shadow-sm sticky top-8">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <UIcon name="i-heroicons-information-circle" class="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" />
                Contact Information
              </h3>
              <div class="space-y-4">
                <a
                  v-for="contact in contactMethods"
                  :key="contact.label"
                  :href="contact.href"
                  class="flex items-start space-x-3 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  <div class="flex-shrink-0 w-10 h-10 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <UIcon :name="contact.icon" class="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div class="flex-1">
                    <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      {{ contact.type }}
                    </p>
                    <p class="text-sm font-medium">
                      {{ contact.label }}
                    </p>
                    <p v-if="contact.subtitle" class="text-xs text-gray-500 dark:text-gray-400">
                      {{ contact.subtitle }}
                    </p>
                  </div>
                </a>
              </div>
            </div>


            <!-- Office Hours Widget -->
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Office Hours
              </h3>
              <div class="space-y-3">
                <div
                  v-for="day in officeHours"
                  :key="day.day"
                  class="flex justify-between items-center"
                >
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {{ day.day }}
                  </span>
                  <span class="text-sm text-gray-600 dark:text-gray-400">
                    {{ day.hours }}
                  </span>
                </div>
              </div>
              <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span class="text-sm text-gray-700 dark:text-gray-300">
                    {{ currentStatus }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Response Time Widget -->
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                What to Expect
              </h3>
              <div class="space-y-4">
                <div class="flex items-start space-x-3">
                  <div class="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                    <UIcon name="i-heroicons-clock" class="h-4 w-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">
                      Quick Response
                    </p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">
                      I typically respond within 24 hours on business days
                    </p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <div class="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                    <UIcon name="i-heroicons-shield-check" class="h-4 w-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">
                      Privacy First
                    </p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">
                      Your information is secure and never shared
                    </p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <div class="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                    <UIcon name="i-heroicons-chat-bubble-left-right" class="h-4 w-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">
                      Free Consultation
                    </p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">
                      Initial consultation is always complimentary
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- FAQ Widget -->
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Answers
              </h3>
              <div class="space-y-3">
                <details
                  v-for="faq in faqs"
                  :key="faq.question"
                  class="group"
                >
                  <summary class="flex justify-between items-center cursor-pointer text-sm font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    {{ faq.question }}
                    <UIcon name="i-heroicons-chevron-down" class="h-4 w-4 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p class="mt-2 text-xs text-gray-600 dark:text-gray-400 pl-4">
                    {{ faq.answer }}
                  </p>
                </details>
              </div>
            </div>

            <!-- Alternative Contact Methods -->
            <div class="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg p-6 shadow-lg text-white">
              <h3 class="text-lg font-semibold mb-3">
                Prefer to Chat?
              </h3>
              <p class="text-sm text-primary-100 mb-4">
                Connect with me directly on your preferred platform.
              </p>
              <div class="grid grid-cols-2 gap-3">
                <a
                  v-for="social in socialLinks"
                  :key="social.name"
                  :href="social.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center space-x-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200"
                >
                  <UIcon :name="social.icon" class="h-4 w-4" />
                  <span class="text-sm font-medium">{{ social.name }}</span>
                </a>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// SEO
useHead({
  title: 'Contact Me - Portfolio',
  meta: [
    { name: 'description', content: 'Get in touch to discuss your project. I typically respond within 24 hours.' },
    { property: 'og:title', content: 'Contact Me - Portfolio' },
    { property: 'og:description', content: 'Let\'s discuss your next project. Quick response guaranteed.' }
  ]
})

// Form state
const form = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  budget: '',
  timeline: '',
  message: '',
  referral: '',
  consent: false,
  newsletter: false
})

// Validation errors
const errors = reactive<Record<string, string>>({})

// Form status
const submitting = ref(false)
const submitted = ref(false)
const submitError = ref('')

// Contact methods
const contactMethods = [
  {
    type: 'Email',
    label: 'hello@example.com',
    subtitle: 'Preferred method',
    href: 'mailto:hello@example.com',
    icon: 'i-heroicons-envelope'
  },
  {
    type: 'Phone',
    label: '+44 (0) 123 456 7890',
    subtitle: 'Mon-Fri, 9am-6pm GMT',
    href: 'tel:+441234567890',
    icon: 'i-heroicons-phone'
  },
  {
    type: 'Location',
    label: 'London, United Kingdom',
    subtitle: 'Available for local meetings',
    href: '#',
    icon: 'i-heroicons-map-pin'
  }
]

// Office hours
const officeHours = [
  { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Saturday', hours: '10:00 AM - 2:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
  { day: 'Holidays', hours: 'Closed' }
]

// Current status (computed based on current time)
const currentStatus = computed(() => {
  const now = new Date()
  const day = now.getDay() // 0 = Sunday, 6 = Saturday
  const hour = now.getHours()
  
  // Monday to Friday, 9am-6pm
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 18) {
    return 'Currently available'
  }
  // Saturday, 10am-2pm
  if (day === 6 && hour >= 10 && hour < 14) {
    return 'Currently available'
  }
  return 'Currently offline'
})

// FAQs
const faqs = [
  {
    question: 'How quickly will you respond?',
    answer: 'I typically respond within 24 hours on business days. For urgent matters, please call directly.'
  },
  {
    question: 'Do you offer free consultations?',
    answer: 'Yes! The initial consultation is always free to discuss your project and see if we\'re a good fit.'
  },
  {
    question: 'What information should I include?',
    answer: 'Tell me about your project goals, timeline, and budget. The more details, the better I can help!'
  },
  {
    question: 'Can you work with my budget?',
    answer: 'I work with a range of budgets. Let\'s discuss your needs and find a solution that works for you.'
  }
]

// Social links
const socialLinks = [
  { name: 'LinkedIn', icon: 'i-simple-icons-linkedin', url: 'https://linkedin.com' },
  { name: 'GitHub', icon: 'i-simple-icons-github', url: 'https://github.com' },
  { name: 'Twitter', icon: 'i-simple-icons-twitter', url: 'https://twitter.com' },
  { name: 'Telegram', icon: 'i-simple-icons-telegram', url: 'https://t.me' }
]

// Validation rules
const validateField = (field: string) => {
  delete errors[field]

  switch (field) {
    case 'name':
      if (!form.name.trim()) {
        errors.name = 'Name is required'
      } else if (form.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters'
      }
      break

    case 'email':
      if (!form.email.trim()) {
        errors.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = 'Please enter a valid email address'
      }
      break

    case 'subject':
      if (!form.subject) {
        errors.subject = 'Please select a subject'
      }
      break

    case 'message':
      if (!form.message.trim()) {
        errors.message = 'Message is required'
      } else if (form.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters'
      } else if (form.message.length > 1000) {
        errors.message = 'Message must not exceed 1000 characters'
      }
      break

    case 'consent':
      if (!form.consent) {
        errors.consent = 'You must agree to the privacy policy'
      }
      break
  }
}

// Validate all required fields
const validateForm = (): boolean => {
  validateField('name')
  validateField('email')
  validateField('subject')
  validateField('message')
  validateField('consent')

  return Object.keys(errors).length === 0
}

// Handle form submission
const handleSubmit = async () => {
  // Reset previous states
  submitted.value = false
  submitError.value = ''

  // Validate form
  if (!validateForm()) {
    submitError.value = 'Please fix the errors above before submitting.'
    return
  }

  submitting.value = true

  try {
    // Simulate API call - replace with actual API endpoint
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Example API call (uncomment and modify when ready):
    // const response = await $fetch('/api/contact', {
    //   method: 'POST',
    //   body: form
    // })

    // Success
    submitted.value = true
    
    // Scroll to success message
    await nextTick()
    const successElement = document.querySelector('.bg-green-50')
    successElement?.scrollIntoView({ behavior: 'smooth', block: 'center' })

    // Reset form after 3 seconds
    setTimeout(() => {
      resetForm()
      submitted.value = false
    }, 5000)

  } catch (error) {
    console.error('Form submission error:', error)
    submitError.value = 'There was an error sending your message. Please try again or contact me directly via email.'
  } finally {
    submitting.value = false
  }
}

// Reset form
const resetForm = () => {
  Object.assign(form, {
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    budget: '',
    timeline: '',
    message: '',
    referral: '',
    consent: false,
    newsletter: false
  })
  
  Object.keys(errors).forEach(key => {
    delete errors[key]
  })
  
  submitted.value = false
  submitError.value = ''
}

// Watch message length to prevent exceeding limit
watch(() => form.message, (newValue) => {
  if (newValue.length > 1000) {
    form.message = newValue.slice(0, 1000)
  }
})
</script>
