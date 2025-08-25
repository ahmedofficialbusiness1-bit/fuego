
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FuegoLogo } from "@/components/fuego-logo";
import Link from "next/link";
import { ArrowLeft, Award, ShieldCheck, Upload } from "lucide-react";

type FormToShow = "jumla" | "rejareja" | null;

const PRICE_PER_ITEM = 150000;

const RetailForm = ({ 
    quantity, 
    handleQuantityChange, 
    totalPrice,
    selectedPaymentMethod,
    handlePaymentMethodChange
}: { 
    quantity: number; 
    handleQuantityChange: (event: React.ChangeEvent<HTMLInputElement>) => void; 
    totalPrice: number; 
    selectedPaymentMethod: string;
    handlePaymentMethodChange: (value: string) => void;
}) => (
    <Card className="w-full max-w-2xl bg-white text-black">
      <CardHeader>
        <CardTitle>Fomu ya Ununuzi wa Rejareja</CardTitle>
        <CardDescription>Jaza fomu hii ili kuweka oda yako ya rejareja.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Jina Kamili</Label>
            <Input id="fullName" placeholder="Weka jina lako kamili" />
          </div>

          <fieldset className="space-y-4 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Anuani</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="street">Mtaa</Label>
                    <Input id="street" placeholder="Mtaa / Eneo" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="district">Wilaya</Label>
                    <Input id="district" placeholder="Wilaya unayoishi" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="region">Mkoa</Label>
                    <Input id="region" placeholder="Mkoa" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="country">Nchi</Label>
                    <Input id="country" placeholder="Nchi" />
                </div>
            </div>
          </fieldset>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Namba ya Simu</Label>
            <Input id="phone" type="tel" placeholder="Weka namba yako ya simu" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Idadi ya Bidhaa</Label>
            <Input id="quantity" type="number" min="1" placeholder="Weka idadi" value={quantity} onChange={handleQuantityChange} />
          </div>

          <div className="p-4 rounded-lg bg-muted space-y-3">
            <p className="text-lg font-bold text-center">Jumla ya Bei: {totalPrice.toLocaleString('en-US')} TZS</p>
            <div className="flex justify-around text-sm text-muted-foreground border-t border-border pt-3">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-accent" />
                    <span>Warranty: Mwaka Mmoja</span>
                </div>
                <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-accent" />
                    <span>Guarantee: 100%</span>
                </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Njia ya Malipo</Label>
            <RadioGroup value={selectedPaymentMethod} onValueChange={handlePaymentMethodChange} className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cash" id="r1" />
                <Label htmlFor="r1">Cash On Delivery</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lipa" id="r2" />
                <Label htmlFor="r2">Lipa Namba</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bank" id="r3" />
                <Label htmlFor="r3">Bank Account</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="p-4 rounded-lg bg-muted text-sm space-y-3">
            {selectedPaymentMethod === 'cash' && (
                <div>
                    <h3 className="font-bold mb-2">Maelezo ya Cash on Delivery</h3>
                    <p>Huduma hii ni kwa ajili ya Unguja tu. Gharama za usafiri ni bure kwa maeneo ya Unguja mjini tu.</p>
                </div>
            )}
            {selectedPaymentMethod === 'lipa' && (
                <div className="space-y-2">
                    <h3 className="font-bold mb-2">Maelezo ya Lipa Namba</h3>
                    <p>1. Fanya malipo kwenye Lipa Namba: <strong className="text-accent">123456</strong> (Jina: Mlandege Home Store)</p>
                    <p>2. Mtandao: <strong className="text-accent">Mixx by Yas</strong></p>
                    <p>3. Screenshot malipo yako na upload hapa chini.</p>
                    <div className="relative flex items-center">
                        <Upload className="absolute left-3 w-5 h-5 text-muted-foreground" />
                        <Input type="file" className="pl-10" />
                    </div>
                </div>
            )}
            {selectedPaymentMethod === 'bank' && (
                <div className="space-y-2">
                    <h3 className="font-bold mb-2">Maelezo ya Bank Account</h3>
                    <p>Benki: <strong className="text-accent">NBC Bank</strong></p>
                    <p>Jina la Akaunti: <strong className="text-accent">Mlandege Home Store</strong></p>
                    <p>Namba ya Akaunti: <strong className="text-accent">[Weka Namba Hapa]</strong></p>
                    <p>Tafadhali piga picha ya skrini (screenshot) malipo yako na upakie hapa chini.</p>
                    <div className="relative flex items-center">
                        <Upload className="absolute left-3 w-5 h-5 text-muted-foreground" />
                        <Input type="file" className="pl-10" />
                    </div>
                </div>
            )}
          </div>


          <Button type="submit" className="w-full">Weka Oda</Button>
        </form>
      </CardContent>
    </Card>
);

export default function NunuaPage() {
  const [formToShow, setFormToShow] = useState<FormToShow>(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(PRICE_PER_ITEM);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10) || 0;
    setQuantity(newQuantity);
    setTotalPrice(newQuantity * PRICE_PER_ITEM);
  };
  
  const handlePaymentMethodChange = (value: string) => {
    setSelectedPaymentMethod(value);
  }


  return (
    <div className="flex flex-col min-h-screen bg-background">
         <header className="sticky top-0 left-0 right-0 z-20 flex justify-between items-center p-4 bg-background/80 backdrop-blur-sm">
            <FuegoLogo className="h-8 w-auto" />
            <Link href="/">
                <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Rudi Mwanzo
                </Button>
            </Link>
        </header>
        <main className="flex-grow flex flex-col items-center justify-center p-8">
            {formToShow === null && (
                <div className="text-center">
                    <h1 className="text-4xl font-bold font-headline mb-4">Chagua Aina ya Ununuzi</h1>
                    <p className="text-muted-foreground mb-8">Ungependa kununua kwa jumla au rejareja?</p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Button size="lg" onClick={() => setFormToShow("jumla")} className="bg-accent text-accent-foreground hover:bg-accent/90">
                        Nunua kwa Jumla
                        </Button>
                        <Button size="lg" variant="outline" onClick={() => setFormToShow("rejareja")}>
                        Nunua kwa Reja reja
                        </Button>
                    </div>
                </div>
            )}

            {formToShow === 'jumla' && (
                <Card className="bg-white text-black">
                    <CardHeader>
                        <CardTitle>Inakuja Hivi Karibuni</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Sehemu ya ununuzi wa jumla bado inatengenezwa.</p>
                        <Button onClick={() => setFormToShow(null)} variant="link" className="px-0">Rudi nyuma</Button>
                    </CardContent>
                </Card>
            )}

            {formToShow === "rejareja" && <RetailForm quantity={quantity} handleQuantityChange={handleQuantityChange} totalPrice={totalPrice} selectedPaymentMethod={selectedPaymentMethod} handlePaymentMethodChange={handlePaymentMethodChange} />}
            

        </main>
    </div>
  );
}
