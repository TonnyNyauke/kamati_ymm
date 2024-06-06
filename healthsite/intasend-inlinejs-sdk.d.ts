declare module 'intasend-inlinejs-sdk' {
    interface IntaSendOptions {
      publicAPIKey: string;
      live: boolean;
    }
  
    class IntaSend {
      constructor(options: IntaSendOptions);
  
      on(event: string, callback: (response: any) => void): void;
    }
  
    interface Window {
      IntaSend: typeof IntaSend | undefined; // Add this line
    }
  
    export default IntaSend;
  }