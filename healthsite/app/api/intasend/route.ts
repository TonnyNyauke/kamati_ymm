// api/[...]mpesa.js


export default async function POST(req: {
  method: string; body: { firstName: any; lastName: any; email: any; amount: any; phoneNumber: any; }; 
},
   res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; }; }) {
    const IntaSend =  require('intasend-node');
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
  const { firstName, lastName, email, amount, phoneNumber } = req.body;

  if (!firstName || !lastName || !email || !amount || !phoneNumber) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const intasend = new IntaSend(
      process.env.INTASEND_PUBKEY, // Replace with your live IntaSend pubkey
      process.env.INTASEND_SECRET, // Replace with your live IntaSend secret
      false // Set to false for production
    );

    const collection = intasend.collection();

    const response = await collection.mpesaStkPush({
      first_name: firstName,
      last_name: lastName,
      email,
      host: 'https://afyabest.vercel.app/', // Replace with your Next.js app's domain
      amount,
      phone_number: phoneNumber,
      api_ref: `checkout_${Date.now()}`,
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error('Mpesa STK Push Error:', error);
    return res.status(500).json({ message: 'Mpesa payment initiation failed' });
  }
}
