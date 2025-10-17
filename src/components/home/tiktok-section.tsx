'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Heart, MessageCircle, Share, ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatNumber } from '@/lib/utils';

const tiktokVideos = [
  {
    id: '1',
    title: 'Summer Dress Styling Tips',
    thumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop',
    views: 125000,
    likes: 8500,
    comments: 234,
    url: 'https://tiktok.com/@hforher/video1',
    productTags: ['Floral Summer Dress', 'Straw Hat'],
    isNew: true,
  },
  {
    id: '2',
    title: 'Office Look Transformation',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop',
    views: 89000,
    likes: 6200,
    comments: 178,
    url: 'https://tiktok.com/@hforher/video2',
    productTags: ['Professional Blazer', 'Pencil Skirt'],
  },
  {
    id: '3',
    title: 'Date Night Outfit Ideas',
    thumbnail: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=500&fit=crop',
    views: 203000,
    likes: 15000,
    comments: 456,
    url: 'https://tiktok.com/@hforher/video3',
    productTags: ['Elegant Evening Gown'],
    isTrending: true,
  },
  {
    id: '4',
    title: 'Casual Weekend Vibes',
    thumbnail: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop',
    views: 67000,
    likes: 4300,
    comments: 123,
    url: 'https://tiktok.com/@hforher/video4',
    productTags: ['Casual Day Dress', 'Denim Jacket'],
  },
];

const ugcPosts = [
  {
    id: '1',
    username: '@rwandangirl',
    image: 'https://images.unsplash.com/photo-1494790108755-2616c0763a86?w=400&h=400&fit=crop',
    product: 'Floral Summer Dress',
    caption: 'Obsessed with this dress from @hforher! Perfect for Kigali weather ☀️',
    likes: 342,
  },
  {
    id: '2',
    username: '@kigalistyle',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    product: 'Professional Blazer',
    caption: 'This blazer makes me feel so confident at work! 💪',
    likes: 156,
  },
  {
    id: '3',
    username: '@fashionista_rw',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    product: 'Elegant Evening Gown',
    caption: 'Date night ready! This dress is everything ✨',
    likes: 789,
  },
];

function TikTokVideoCard({ video }: { video: any }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Card className="group overflow-hidden bg-jet-black text-soft-white">
      <div className="relative aspect-[9/16]">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {video.isNew && <Badge variant="new">New</Badge>}
          {video.isTrending && <Badge variant="trending">Viral</Badge>}
        </div>
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.open(video.url, '_blank')}
            className="p-4 bg-soft-white/20 backdrop-blur-sm rounded-full hover:bg-soft-white/30 transition-colors"
          >
            <Play className="h-8 w-8 text-soft-white fill-current ml-1" />
          </motion.button>
        </div>
        
        {/* Stats */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center justify-between text-soft-white">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4" />
                <span className="text-sm">{formatNumber(video.likes)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">{formatNumber(video.comments)}</span>
              </div>
            </div>
            <div className="text-sm opacity-75">
              {formatNumber(video.views)} views
            </div>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-medium mb-2 line-clamp-2">{video.title}</h3>
        
        {/* Product Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {video.productTags.map((tag: string, index: number) => (
            <span
              key={index}
              className="text-xs bg-champagne-beige text-jet-black px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="w-full border-soft-white text-soft-white hover:bg-soft-white hover:text-jet-black"
          onClick={() => window.open(video.url, '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Watch on TikTok
        </Button>
      </CardContent>
    </Card>
  );
}

function UGCCard({ post }: { post: any }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={post.image}
          alt={`${post.username} wearing ${post.product}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        
        {/* Heart overlay */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
            <Heart className="h-3 w-3 text-soft-white fill-current" />
            <span className="text-xs text-soft-white">{post.likes}</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-3">
        <p className="text-sm font-medium text-jet-black mb-1">{post.username}</p>
        <p className="text-xs text-warm-gray line-clamp-2">{post.caption}</p>
        <p className="text-xs text-champagne-beige font-medium mt-1">#{post.product}</p>
      </CardContent>
    </Card>
  );
}

export function TikTokSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-jet-black to-warm-gray text-soft-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold mb-4">
            Trending on TikTok
          </h2>
          <p className="text-soft-white/80 max-w-2xl mx-auto mb-8">
            See how our community styles our pieces! Follow us for daily fashion inspiration 
            and styling tips.
          </p>
          
          <Button
            size="lg"
            className="bg-gradient-primary hover:bg-gradient-secondary text-jet-black font-semibold"
            onClick={() => window.open('https://tiktok.com/@hforher', '_blank')}
          >
            Follow @hforher on TikTok
          </Button>
        </div>

        {/* TikTok Videos Grid */}
        <div className="mb-16">
          <h3 className="font-playfair text-2xl font-semibold mb-8 text-center">
            Latest Videos
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tiktokVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TikTokVideoCard video={video} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* User Generated Content */}
        <div>
          <h3 className="font-playfair text-2xl font-semibold mb-8 text-center">
            Styled by You
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {ugcPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <UGCCard post={post} />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-soft-white/80 mb-4">
              Share your H for Her style using #HforHerStyle for a chance to be featured!
            </p>
            <Button
              variant="outline"
              className="border-soft-white text-soft-white hover:bg-soft-white hover:text-jet-black"
            >
              View More UGC
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
