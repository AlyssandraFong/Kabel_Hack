import Expandable from "@/components/Expandable";
import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import Testimonials from "@/partials/Testimonials";
import { AboutUsItem, RegularPage } from "@/types";
import Link from "next/link";
import { FaBoxOpen, FaCheckCircle, FaHeadset } from "react-icons/fa";

const About = () => {
  const data: RegularPage = getListPage("about/_index.md");
  const { frontmatter } = data;

  const {
    title,
    about_us,
    faq_section_title,
    button,
    faq_section_subtitle,
    faqs,
    testimonials_section_enable,
    testimonials_section_title,
    testimonials,
    staff_section_enable,
    staff,
  } = frontmatter;

  return (
    <div className="min-h-screen bg-gradient-gray-1000 dark:from-darkmode dark:via-darkmode-light dark:to-darkmode">
      <SeoMeta {...frontmatter} />
      <PageHeader title={title} />

      {/* About Us Section */}
      <section className="py-16">
        <div className="container space-y-20">
          {about_us?.map((section: AboutUsItem, index: number) => (
            <div
              key={section?.title}
              className={`flex flex-col-reverse lg:flex-row items-center gap-12 ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Text */}
              <div className="lg:w-3/5 space-y-5 bg-light dark:bg-darkmode-light backdrop-blur-lg p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold">{section?.title}</h2>
                <p
                  className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={markdownify(section?.content)}
                />
              </div>

              {/* Image */}
              <div className="lg:w-2/5 flex justify-center">
                <div className="overflow-hidden rounded-2xl shadow-xl">
                  <ImageFallback
                    className="w-full h-auto max-w-[450px] object-cover transition-transform duration-500 hover:scale-105"
                    src={section?.image}
                    width={650}
                    height={500}
                    alt={section?.title}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      {testimonials_section_enable && (
        <Testimonials
          title={testimonials_section_title!}
          testimonials={testimonials!}
        />
      )}

      {/* Staff Section */}
      {staff_section_enable && (
        <section className="py-20">
          <div className="container">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Our Staff</h2>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-14">
                {staff!.map((s, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden bg-white/80 dark:bg-gray-800/70 backdrop-blur-md"
                  >
                    <ImageFallback
                      src={s.avatar}
                      alt={`Staff-${s.name}`}
                      width={400}
                      height={350}
                      className="w-full h-[350px] object-cover"
                    />
                    <div className="py-6 px-4 text-center space-y-2">
                      <h3 className="text-xl font-semibold">{s.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {s.designation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Reasons Section */}
      <section className="py-20">
        <div className="container">
          <div className="px-8 py-16 text-center rounded-2xl shadow-xl bg-light dark:bg-darkmode-light backdrop-blur-lg">
            <h2 className="text-3xl font-bold">Reasons to choose us</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-14">
              {[
                {
                  icon: <FaHeadset size={52} />,
                  title: "24/7 Friendly Support",
                  desc: "Our support team is always ready for you, 7 days a week.",
                },
                {
                  icon: <FaBoxOpen size={52} />,
                  title: "Hassle-Free Transactions",
                  desc: "We make buying, selling, or financing your car simple, fast, and transparent.",
                },
                {
                  icon: <FaCheckCircle size={52} />,
                  title: "Trusted Quality & Assurance",
                  desc: "Every service and vehicle goes through thorough checks to ensure reliability and peace of mind.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white dark:bg-gray-800/70 shadow hover:shadow-xl transition"
                >
                  <div className="flex justify-center text-primary">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mt-6 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container">
          <div className="px-8 py-16 rounded-2xl shadow-xl bg-white dark:bg-gray-800">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Left column */}
              <div className="space-y-5">
                <h1
                  className="text-3xl font-bold"
                  dangerouslySetInnerHTML={markdownify(faq_section_title!)}
                />
                <p
                  dangerouslySetInnerHTML={markdownify(faq_section_subtitle!)}
                  className="md:text-lg text-gray-600 dark:text-gray-300"
                />

                {button?.enable && (
                  <Link
                    className="inline-block px-6 py-3 rounded-xl bg-black text-white font-medium shadow hover:opacity-90 transition"
                    href={button.link}
                  >
                    {button.label}
                  </Link>
                )}
              </div>

              {/* Right column */}
              <div>
                <Expandable faqs={faqs!} />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
