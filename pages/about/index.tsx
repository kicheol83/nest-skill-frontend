import React from "react";
import { NextPage } from "next";
import useDeviceDetect from "../../libs/hooks/useDeviceDetect";
import { Stack, Box } from "@mui/material";
import withLayoutNew from "@/libs/components/layout/LayoutNew";

const About: NextPage = () => {
  const device = useDeviceDetect();

  if (device === "mobile") {
    return <div>ABOUT PAGE MOBILE</div>;
  } else {
    return (
      <Stack className={"about-page"}>
        <Stack className={"intro"}>
          <Stack className={"container"}>
            <Stack className={"left"}>
              <strong>
                We’re on a Mission to Transform How People Connect with
                Services.
              </strong>
            </Stack>
            <Stack className={"right"}>
              <p>
                Finding the right service provider should be simple, fast, and
                reliable. At Skill Nest, we empower individuals and businesses
                to discover skilled providers who can deliver quality results
                with ease.
                <br />
                <br />
                Whether you’re looking for a freelancer, a professional service,
                or a long-term partner, our platform makes it seamless to
                connect, collaborate, and grow. We believe in building trust,
                transparency, and opportunities for everyone.
              </p>
              <Stack className={"boxes"}>
                <div className={"box"}>
                  <div>
                    <img src="/img/icons/garden.svg" alt="" />
                  </div>
                  <span>Verified Providers</span>
                  <p>Every provider is reviewed to ensure quality and trust.</p>
                </div>
                <div className={"box"}>
                  <div>
                    <img src="/img/icons/securePayment.svg" alt="" />
                  </div>
                  <span>Secure Payments</span>
                  <p>
                    Payments are protected and released only when you’re
                    satisfied.
                  </p>
                </div>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <Stack className={"statistics"}>
          <Stack className={"container"}>
            <Stack className={"banner"}>
              <img src="/img/banner/provider.jpg" alt="" />
            </Stack>
            <Stack className={"info"}>
              <Box component={"div"}>
                <strong>10K+</strong>
                <p>Skilled Providers</p>
              </Box>
              <Box component={"div"}>
                <strong>25K+</strong>
                <p>Jobs Completed</p>
              </Box>
              <Box component={"div"}>
                <strong>50K+</strong>
                <p>Satisfied Clients</p>
              </Box>
            </Stack>
          </Stack>
        </Stack>

        <Stack className={"agents"}>
          <Stack className={"container"}>
            <span className={"title"}>Our Top Service Providers</span>
            <p className={"desc"}>
              Professionals who deliver excellence across multiple industries.
            </p>
            <Stack className={"wrap"}>
              {/* Here you can map AgentCard or ProviderCard */}
            </Stack>
          </Stack>
        </Stack>

        <Stack className={"options"}>
          <img
            src="/img/banner/home-banner.png"
            alt=""
            className={"about-banner"}
          />
          <Stack className={"container"}>
            <strong>Find the best service option for your needs</strong>
            <Stack>
              <div className={"icon-box"}>
                <img src="/img/icons/security.svg" alt="" />
              </div>
              <div className={"text-box"}>
                <span>Job Matching</span>
                <p>
                  Get matched with providers based on your project requirements.
                </p>
              </div>
            </Stack>
            <Stack>
              <div className={"icon-box"}>
                <img src="/img/icons/keywording.svg" alt="" />
              </div>
              <div className={"text-box"}>
                <span>Flexible Services</span>
                <p>
                  Choose from short-term gigs, part-time help, or long-term
                  work.
                </p>
              </div>
            </Stack>
            <Stack>
              <div className={"icon-box"}>
                <img src="/img/icons/investment.svg" alt="" />
              </div>
              <div className={"text-box"}>
                <span>Growth Opportunities</span>
                <p>
                  Providers grow their careers, while clients find trusted
                  partners.
                </p>
              </div>
            </Stack>
            <Stack className={"btn"}>
              Learn More
              <img src="/img/icons/rightup.svg" alt="" />
            </Stack>
          </Stack>
        </Stack>

        <Stack className={"partners"}>
          <Stack className={"container"}>
            <span>Trusted by professionals worldwide</span>
            <Stack className={"wrap"}>
              <img src="/img/icons/brands/amazon.svg" alt="" />
              <img src="/img/icons/brands/amd.svg" alt="" />
              <img src="/img/icons/brands/cisco.svg" alt="" />
              <img src="/img/icons/brands/dropcam.svg" alt="" />
              <img src="/img/icons/brands/spotify.svg" alt="" />
            </Stack>
          </Stack>
        </Stack>

        <Stack className={"help"}>
          <Stack className={"container"}>
            <Box component={"div"} className={"left"}>
              <strong>Need help? Talk to our support team.</strong>
              <p>We’re here to assist you with providers, jobs, or payments.</p>
            </Box>
            <Box component={"div"} className={"right"}>
              <div className={"white"}>
                Contact Us
                <img src="/img/icons/rightup.svg" alt="" />
              </div>
              <div className={"black"}>
                <img src="/img/icons/call.svg" alt="" />
                010-8233-3848
              </div>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    );
  }
};

export default withLayoutNew(About);
