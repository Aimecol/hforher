import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const footerLinks = {
  shop: [
    { name: 'New Arrivals', href: '/category/new-arrivals' },
    { name: 'Dresses', href: '/category/dresses' },
    { name: 'Tops', href: '/category/tops' },
    { name: 'Bottoms', href: '/category/bottoms' },
    { name: 'Accessories', href: '/category/accessories' },
    { name: 'Sale', href: '/category/sale' },
  ],
  customer: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Track Order', href: '/track-order' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Story', href: '/our-story' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Sustainability', href: '/sustainability' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Accessibility', href: '/accessibility' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-blush-pink/30 mt-16">
      {/* Newsletter Section */}
      <div className="bg-gradient-primary py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl font-bold text-jet-black mb-4">
            Stay in Style
          </h2>
          <p className="text-warm-gray mb-8 max-w-md mx-auto">
            Subscribe to get the latest fashion trends, exclusive offers, and style tips 
            delivered straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
              required
            />
            <Button type="submit" className="px-8">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              {/* <div className="bg-gradient-primary p-2 rounded-lg"> */}
                <img src="/logo.png" alt="Logo" className="w-8" />
              {/* </div> */}
              <div>
                <h3 className="font-playfair font-bold text-xl text-jet-black">
                  H for Her
                </h3>
                <p className="text-sm text-warm-gray font-dancing">
                  Fashion from the Heart
                </p>
              </div>
            </div>
            <p className="text-warm-gray mb-6 leading-relaxed">
              Bringing you the latest fashion trends from China to Rwanda. 
              Quality clothing for the modern woman who values style, comfort, and affordability.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-warm-gray">
                <Mail className="h-4 w-4" />
                <span>hello@hforher.rw</span>
              </div>
              <div className="flex items-center space-x-3 text-warm-gray">
                <Phone className="h-4 w-4" />
                <span>+250 788 123 456</span>
              </div>
              <div className="flex items-center space-x-3 text-warm-gray">
                <MapPin className="h-4 w-4" />
                <span>Kigali, Rwanda</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center space-x-4 mt-6">
              <a
                href="https://tiktok.com/@hforher"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-soft-white rounded-full hover:bg-champagne-beige transition-colors"
              >
                <div className="h-5 w-5 bg-jet-black rounded-sm"></div>
              </a>
              <a
                href="https://instagram.com/hforher"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-soft-white rounded-full hover:bg-champagne-beige transition-colors"
              >
                <Instagram className="h-5 w-5 text-jet-black" />
              </a>
              <a
                href="https://facebook.com/hforher"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-soft-white rounded-full hover:bg-champagne-beige transition-colors"
              >
                <Facebook className="h-5 w-5 text-jet-black" />
              </a>
              <a
                href="https://twitter.com/hforher"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-soft-white rounded-full hover:bg-champagne-beige transition-colors"
              >
                <Twitter className="h-5 w-5 text-jet-black" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-playfair font-semibold text-jet-black mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-warm-gray hover:text-dusty-rose transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-playfair font-semibold text-jet-black mb-4">Customer Service</h4>
            <ul className="space-y-3">
              {footerLinks.customer.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-warm-gray hover:text-dusty-rose transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-playfair font-semibold text-jet-black mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-warm-gray hover:text-dusty-rose transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Legal Links */}
            <h5 className="font-playfair font-semibold text-jet-black mt-6 mb-3">Legal</h5>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-warm-gray hover:text-dusty-rose transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-warm-gray/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-warm-gray text-sm">
            © {new Date().getFullYear()} H for Her. All rights reserved.
          </p>
          
          {/* Payment Methods */}
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-warm-gray text-sm">We accept:</span>
            <div className="flex items-center space-x-2">
              <div className="px-3 py-1 bg-soft-white rounded border text-xs font-medium">
                Visa
              </div>
              <div className="px-3 py-1 bg-soft-white rounded border text-xs font-medium">
                MoMo
              </div>
              <div className="px-3 py-1 bg-soft-white rounded border text-xs font-medium">
                Airtel
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
