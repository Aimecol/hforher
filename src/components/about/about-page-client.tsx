'use client';

import { motion } from 'framer-motion';
import { Heart, Users, Award, Globe, Truck, Shield } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

export function AboutPageClient() {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Fashion',
      description: 'We believe fashion is a form of self-expression that should be accessible to every woman in Rwanda and beyond.',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Building a supportive community of confident women who inspire and uplift each other through style.',
    },
    {
      icon: Award,
      title: 'Quality Promise',
      description: 'Every piece in our collection is carefully selected for quality, comfort, and style that lasts.',
    },
    {
      icon: Globe,
      title: 'Global Style, Local Heart',
      description: 'Bringing international fashion trends to Rwanda while celebrating our local culture and craftsmanship.',
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Customers' },
    { number: '500+', label: 'Fashion Items' },
    { number: '98%', label: 'Customer Satisfaction' },
    { number: '2+', label: 'Years of Excellence' },
  ];

  const team = [
    {
      name: 'Sarah Uwimana',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=300&h=300&fit=crop&crop=face',
      bio: 'Passionate about empowering women through fashion with over 8 years in the industry.',
    },
    {
      name: 'Grace Mukamana',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face',
      bio: 'Creative visionary who curates our collections with an eye for trends and timeless style.',
    },
    {
      name: 'Divine Uwase',
      role: 'Customer Experience',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face',
      bio: 'Dedicated to ensuring every customer has an exceptional shopping experience.',
    },
  ];

  return (
    <div className="min-h-screen bg-blush-pink/20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-jet-black mb-6">
              Our Story
            </h1>
            <p className="text-jet-black/80 text-xl leading-relaxed">
              H for Her was born from a simple belief: every woman deserves to feel confident, 
              beautiful, and empowered through the clothes she wears. We're more than just a fashion 
              brand—we're a movement celebrating the strength and beauty of women in Rwanda and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-playfair text-4xl font-bold text-jet-black mb-6">
                Our Mission
              </h2>
              <p className="text-warm-gray text-lg max-w-3xl mx-auto">
                To provide high-quality, stylish fashion that empowers women to express their unique 
                personalities while building a sustainable and inclusive fashion ecosystem in Rwanda.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-0 shadow-md hover:shadow-brand-lg transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-champagne-beige/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <value.icon className="h-8 w-8 text-champagne-beige" />
                      </div>
                      <h3 className="font-semibold text-jet-black text-lg mb-3">
                        {value.title}
                      </h3>
                      <p className="text-warm-gray text-sm">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-jet-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-playfair text-4xl font-bold text-soft-white text-center mb-12">
              Our Impact
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-3xl lg:text-4xl font-bold text-champagne-beige mb-2">
                    {stat.number}
                  </div>
                  <div className="text-soft-white/80">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-playfair text-4xl font-bold text-jet-black mb-6">
                Meet Our Team
              </h2>
              <p className="text-warm-gray text-lg max-w-3xl mx-auto">
                The passionate women behind H for Her who work tirelessly to bring you the best 
                fashion experience in Rwanda.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-md hover:shadow-brand-lg transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-playfair text-xl font-bold text-jet-black mb-1">
                        {member.name}
                      </h3>
                      <p className="text-champagne-beige font-semibold mb-3">
                        {member.role}
                      </p>
                      <p className="text-warm-gray text-sm">
                        {member.bio}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-16 bg-gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-playfair text-4xl font-bold text-soft-white mb-6">
                Our Commitment
              </h2>
              <p className="text-soft-white/90 text-lg max-w-3xl mx-auto">
                We're committed to providing exceptional service and building lasting relationships 
                with our customers across Rwanda and beyond.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="bg-soft-white/10 border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Truck className="h-8 w-8 text-soft-white mr-3" />
                      <h3 className="font-semibold text-soft-white text-lg">
                        Fast & Reliable Delivery
                      </h3>
                    </div>
                    <p className="text-soft-white/80">
                      Free delivery across Kigali and affordable shipping throughout Rwanda. 
                      Your fashion should reach you quickly and safely.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="bg-soft-white/10 border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Shield className="h-8 w-8 text-soft-white mr-3" />
                      <h3 className="font-semibold text-soft-white text-lg">
                        Quality Guarantee
                      </h3>
                    </div>
                    <p className="text-soft-white/80">
                      30-day return policy and quality guarantee on all items. 
                      Your satisfaction is our priority, always.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="font-playfair text-4xl font-bold text-jet-black mb-6">
              Join Our Fashion Journey
            </h2>
            <p className="text-warm-gray text-lg mb-8">
              Become part of the H for Her community and discover fashion that celebrates 
              your unique style and empowers your confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-champagne-beige hover:bg-dusty-rose text-jet-black px-8 py-3 rounded-md font-semibold transition-colors">
                Shop Collection
              </button>
              <button className="border border-champagne-beige text-champagne-beige hover:bg-champagne-beige hover:text-jet-black px-8 py-3 rounded-md font-semibold transition-colors">
                Follow Our Story
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
