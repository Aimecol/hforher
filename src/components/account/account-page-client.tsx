'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  CreditCard, 
  Bell, 
  Settings, 
  LogOut,
  Edit,
  Truck,
  Shield,
  Phone,
  Mail
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency } from '@/lib/utils';

export function AccountPageClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data
  const user = {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+250 788 123 456',
    avatar: '',
    joinDate: '2024-01-15',
    totalOrders: 12,
    totalSpent: 456000,
    membershipLevel: 'Gold',
  };

  const recentOrders = [
    {
      id: 'HFH-240001',
      date: '2024-10-10',
      status: 'Delivered',
      total: 45000,
      items: 3,
    },
    {
      id: 'HFH-239984',
      date: '2024-10-05',
      status: 'In Transit',
      total: 28500,
      items: 2,
    },
    {
      id: 'HFH-239901',
      date: '2024-09-28',
      status: 'Processing',
      total: 67200,
      items: 4,
    },
  ];

  const addresses = [
    {
      id: '1',
      type: 'Home',
      name: `${user.firstName} ${user.lastName}`,
      address: 'KG 123 St, Kicukiro',
      city: 'Kigali',
      phone: user.phone,
      isDefault: true,
    },
    {
      id: '2',
      type: 'Office',
      name: `${user.firstName} ${user.lastName}`,
      address: 'KN 45 Ave, Gasabo',
      city: 'Kigali',
      phone: user.phone,
      isDefault: false,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in transit':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-blush-pink/20 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-champagne-beige text-jet-black text-lg font-semibold">
                    {user.firstName[0]}{user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="font-playfair text-3xl font-bold text-jet-black">
                    Welcome back, {user.firstName}!
                  </h1>
                  <p className="text-warm-gray">
                    {user.membershipLevel} Member since {new Date(user.joinDate).getFullYear()}
                  </p>
                </div>
              </div>
              <Button variant="outline" onClick={() => router.push('/signin')}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </motion.div>

          {/* Account Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-warm-gray">Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-jet-black">{user.totalOrders}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-warm-gray">Total Spent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-jet-black">
                  {formatCurrency(user.totalSpent)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-warm-gray">Membership Level</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="text-sm">
                  {user.membershipLevel} Member
                </Badge>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-6">
                {menuItems.map((item) => (
                  <TabsTrigger key={item.id} value={item.id} className="flex items-center space-x-2">
                    <item.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Orders */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Recent Orders</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab('orders')}>
                        View All
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentOrders.slice(0, 3).map((order) => (
                          <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-semibold text-jet-black">#{order.id}</p>
                              <p className="text-sm text-warm-gray">
                                {new Date(order.date).toLocaleDateString()} • {order.items} items
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">{formatCurrency(order.total)}</p>
                              <Badge variant="secondary" className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => router.push('/wishlist')}
                        >
                          <Heart className="h-4 w-4 mr-2" />
                          View Wishlist
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => setActiveTab('addresses')}
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          Manage Addresses
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => setActiveTab('payment')}
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          Payment Methods
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => router.push('/support')}
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          Customer Support
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-champagne-beige/20 rounded-lg flex items-center justify-center">
                              <Package className="h-6 w-6 text-champagne-beige" />
                            </div>
                            <div>
                              <p className="font-semibold text-jet-black">Order #{order.id}</p>
                              <p className="text-sm text-warm-gray">
                                {new Date(order.date).toLocaleDateString()} • {order.items} items
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{formatCurrency(order.total)}</p>
                            <Badge variant="secondary" className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Addresses Tab */}
              <TabsContent value="addresses" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-jet-black">Delivery Addresses</h2>
                  <Button>
                    <MapPin className="h-4 w-4 mr-2" />
                    Add New Address
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((address) => (
                    <Card key={address.id}>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">{address.type}</CardTitle>
                        <div className="flex items-center space-x-2">
                          {address.isDefault && (
                            <Badge variant="secondary">Default</Badge>
                          )}
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="font-semibold text-jet-black">{address.name}</p>
                          <p className="text-warm-gray">{address.address}</p>
                          <p className="text-warm-gray">{address.city}</p>
                          <div className="flex items-center space-x-2 text-warm-gray">
                            <Phone className="h-4 w-4" />
                            <span>{address.phone}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Payment Tab */}
              <TabsContent value="payment" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-jet-black">Payment Methods</h2>
                  <Button>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                </div>

                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <CreditCard className="h-12 w-12 text-warm-gray mx-auto mb-4" />
                      <p className="text-warm-gray">No payment methods added yet</p>
                      <p className="text-sm text-warm-gray mt-2">
                        Add a payment method to make checkout faster
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Order Updates</p>
                          <p className="text-sm text-warm-gray">Get notified about your order status</p>
                        </div>
                        <Button variant="outline" size="sm">Enable</Button>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Promotions & Sales</p>
                          <p className="text-sm text-warm-gray">Receive marketing emails about new deals</p>
                        </div>
                        <Button variant="outline" size="sm">Enable</Button>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Arrivals</p>
                          <p className="text-sm text-warm-gray">Be the first to know about new products</p>
                        </div>
                        <Button variant="outline" size="sm">Enable</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-sm text-warm-gray">{user.email}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-sm text-warm-gray">{user.phone}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Password</p>
                          <p className="text-sm text-warm-gray">••••••••</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Change
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
