import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Blogly?",
    answer:
      "Blogly is a SaaS platform designed to simplify blog management and boost SEO for Next.js and React applications. It provides an easy-to-use dashboard for writing, editing, and managing blog posts.",
  },
  {
    question: "Is Blogly free to use?",
    answer:
      "Yes, Blogly is currently free to use. Enjoy full access to all features without any cost.",
  },
  {
    question: "How do I integrate Blogly with my existing app?",
    answer:
      "Integrating Blogly with your existing app is simple. You can use our API endpoints to fetch and display blog posts seamlessly. Check out the API usage examples for more details.",
  },
  {
    question: "Will there be premium features in the future?",
    answer:
      "Yes, as we grow, we plan to introduce premium features and plans. Stay tuned for updates!",
  },
  {
    question: "How can I get support?",
    answer:
      "If you need support, you can use our support page to send us a message. We're here to help!",
  },
];

const FaqSection = () => {
  return (
    <div className="container mx-auto px-4" itemScope itemType="https://schema.org/FAQPage">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Frequently Asked Questions
      </h2>
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-3xl mx-auto space-y-4"
      >
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FaqSection;
