import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { bookTable } from '@/lib/utils';
import { TableBooking } from '@/lib/types';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const bookingSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  date: z.string().min(1, { message: 'Please select a date.' }),
  time: z.string().min(1, { message: 'Please select a time.' }),
  guests: z.string().min(1, { message: 'Please select number of guests.' }),
  occasion: z.string().optional(),
  specialRequests: z.string().optional(),
});

export function Booking() {
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  
  const { ref: contentRef } = useScrollAnimation();
  const { ref: formRef } = useScrollAnimation();
  
  const form = useForm<TableBooking>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      phone: '',
      date: '',
      time: '',
      guests: '',
      occasion: '',
      specialRequests: '',
    },
  });
  
  const mutation = useMutation({
    mutationFn: bookTable,
    onSuccess: () => {
      setBookingSuccess(true);
      form.reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setBookingSuccess(false);
      }, 5000);
    },
  });
  
  const onSubmit = (data: TableBooking) => {
    mutation.mutate(data);
  };
  
  return (
    <section id="booking" className="py-20 bg-secondary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in" ref={contentRef}>
            <span className="text-accent font-script text-3xl">Reserve</span>
            <h2 className="font-display text-4xl font-bold mt-2 mb-6">Book Your Table</h2>
            <div className="w-20 h-1 bg-accent mb-8"></div>
            
            <p className="mb-8 text-neutral-300 leading-relaxed">
              Experience the perfect dining atmosphere at Gusto. Reserve your table now and allow us to craft a memorable culinary journey for you and your companions. For special events and large groups, please call us directly.
            </p>
            
            <div className="flex flex-col space-y-6 mb-8">
              <div className="flex items-start">
                <i className="fas fa-map-marker-alt text-accent text-xl mt-1 mr-4"></i>
                <div>
                  <h3 className="font-display font-semibold mb-1">Location</h3>
                  <p className="text-neutral-300">123 Gourmet Avenue, Culinary District</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <i className="fas fa-clock text-accent text-xl mt-1 mr-4"></i>
                <div>
                  <h3 className="font-display font-semibold mb-1">Opening Hours</h3>
                  <p className="text-neutral-300">Mon-Thu: 11:00-23:00<br />Fri-Sun: 11:00-00:00</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <i className="fas fa-phone-alt text-accent text-xl mt-1 mr-4"></i>
                <div>
                  <h3 className="font-display font-semibold mb-1">Reservations</h3>
                  <p className="text-neutral-300">+1 (555) 123-4567<br />reservations@gusto-restaurant.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-black bg-opacity-30 p-8 rounded-lg fade-in" ref={formRef}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium mb-2">Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="John Doe"
                            className="w-full px-4 py-3 bg-white bg-opacity-10 border border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent text-white"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium mb-2">Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="+1 (555) 123-4567"
                            className="w-full px-4 py-3 bg-white bg-opacity-10 border border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent text-white"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium mb-2">Date</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            {...field} 
                            className="w-full px-4 py-3 bg-white bg-opacity-10 border border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent text-white"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium mb-2">Time</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full px-4 py-3 bg-white bg-opacity-10 border border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent text-white">
                              <SelectValue placeholder="Select Time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="11:30">11:30 AM</SelectItem>
                            <SelectItem value="12:00">12:00 PM</SelectItem>
                            <SelectItem value="12:30">12:30 PM</SelectItem>
                            <SelectItem value="13:00">1:00 PM</SelectItem>
                            <SelectItem value="13:30">1:30 PM</SelectItem>
                            <SelectItem value="19:00">7:00 PM</SelectItem>
                            <SelectItem value="19:30">7:30 PM</SelectItem>
                            <SelectItem value="20:00">8:00 PM</SelectItem>
                            <SelectItem value="20:30">8:30 PM</SelectItem>
                            <SelectItem value="21:00">9:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="guests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium mb-2">Number of Guests</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full px-4 py-3 bg-white bg-opacity-10 border border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent text-white">
                              <SelectValue placeholder="Select Number" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1 Person</SelectItem>
                            <SelectItem value="2">2 People</SelectItem>
                            <SelectItem value="3">3 People</SelectItem>
                            <SelectItem value="4">4 People</SelectItem>
                            <SelectItem value="5">5 People</SelectItem>
                            <SelectItem value="6">6 People</SelectItem>
                            <SelectItem value="7+">7+ People</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="occasion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium mb-2">Occasion (Optional)</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full px-4 py-3 bg-white bg-opacity-10 border border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent text-white">
                              <SelectValue placeholder="Select Occasion" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="birthday">Birthday</SelectItem>
                            <SelectItem value="anniversary">Anniversary</SelectItem>
                            <SelectItem value="date">Date Night</SelectItem>
                            <SelectItem value="business">Business Meal</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="specialRequests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium mb-2">Special Requests</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          rows={3}
                          placeholder="Any dietary restrictions or special requests?"
                          className="w-full px-4 py-3 bg-white bg-opacity-10 border border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent text-white"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="text-center">
                  <Button 
                    type="submit"
                    disabled={mutation.isPending}
                    className="bg-accent hover:bg-opacity-90 transition-all text-white py-3 px-8 rounded-sm uppercase text-sm tracking-wider font-medium inline-block w-full"
                  >
                    {mutation.isPending ? 'Processing...' : 'Confirm Reservation'}
                  </Button>
                </div>
              </form>
            </Form>
            
            {bookingSuccess && (
              <Alert className="bg-success bg-opacity-20 border border-success text-white p-4 rounded-sm mt-6">
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-success text-xl mt-1 mr-3"></i>
                  <AlertDescription>
                    <h3 className="font-display font-semibold mb-1">Reservation Successful!</h3>
                    <p>Thank you for your reservation. We'll send a confirmation to your phone shortly.</p>
                  </AlertDescription>
                </div>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
