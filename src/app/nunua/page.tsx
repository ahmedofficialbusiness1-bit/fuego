
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FuegoLogo } from "@/components/fuego-logo";
import Link from "next/link";
import { ArrowLeft, Award, ShieldCheck } from "lucide-react";

type FormToShow = "jumla" | "rejareja" | null;

const PRICE_PER_ITEM = 150000;

export default function NunuaPage() {
  const [formToShow, setFormToShow] = useState<FormToShow>(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(PRICE_PER_ITEM);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10) || 0;
    setQuantity(newQuantity);
    setTotalPrice(newQuantity * PRICE_PER_ITEM);
  };

  const RetailForm = () => (
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
                    <span>Guarantee: 100% Asilia</span>
                </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Njia ya Malipo</Label>
            <RadioGroup defaultValue="cash" className="space-y-2">
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

          <Button type="submit" className="w-full">Weka Oda</Button>
        </form>
      </CardContent>
    </Card>
  );

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

            {formToShow === "rejareja" && <RetailForm />}
            

        </main>
    </div>
  );
}
