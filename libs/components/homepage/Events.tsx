import React from "react";
import { Stack, Box, Typography } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";

interface EventData {
  eventTitle: string;
  city: string;
  description: string;
  imageSrc: string;
}

const eventsData: EventData[] = [
  {
    eventTitle: "Expert Home Cleaning",
    city: "Incheon",
    description:
      "Find trusted cleaning professionals in Incheon to make your home sparkle. Book reliable services with just a few clicks!",
    imageSrc: "/img/service-img/cleaning.jpg",
  },
  {
    eventTitle: "Private Tutoring Sessions",
    city: "Seoul",
    description:
      "Looking to improve your skills? Connect with top-rated tutors in Seoul for language, math, or specialized training.",
    imageSrc: "/img/service-img/babysitting.jpeg",
  },
  {
    eventTitle: "Pet Walking & Care",
    city: "Daegu",
    description:
      "Busy schedule? Hire friendly pet care providers in Daegu to take care of your furry friends with love and attention.",
    imageSrc: "/img/service-img/pet-service.webp",
  },
  {
    eventTitle: "Car Repair & Maintenance",
    city: "Busan",
    description:
      "Need quick vehicle support? Book skilled mechanics in Busan for car repairs, oil changes, and maintenance anytime.",
    imageSrc: "/img/service-img/repair.jpg",
  },
];

const EventCard = ({ event }: { event: EventData }) => {
  return (
    <Stack
      className="event-card"
      sx={{
        position: "relative",
        width: 300,
        height: 420,
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
        backgroundImage: `url(${event.imageSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "transform 0.4s ease, box-shadow 0.4s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0px 12px 32px rgba(0,0,0,0.4)",
          "& .overlay": { opacity: 1 },
        },
      }}
    >
      {/* Gradient overlay */}
      <Box
        className="overlay"
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0.3) 60%, transparent 100%)",
          opacity: 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Info content */}
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          zIndex: 2,
          color: "white",
        }}
      >
        <Typography
          variant="overline"
          sx={{ color: "#f64747", fontWeight: 600, letterSpacing: 1 }}
        >
          {event.city}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            textShadow: "0px 2px 6px rgba(0,0,0,0.6)",
          }}
        >
          {event.eventTitle}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            lineHeight: 1.4,
            color: "rgba(255,255,255,0.9)",
            maxHeight: 60,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {event.description}
        </Typography>
      </Box>
    </Stack>
  );
};

const Events = () => {
  const device = useDeviceDetect();

  if (device === "mobile") {
    return (
      <Stack spacing={2} p={2}>
        {eventsData.map((event: EventData) => (
          <EventCard event={event} key={event.eventTitle} />
        ))}
      </Stack>
    );
  } else {
    return (
      <Stack
        className="events"
        sx={{
          py: 10,
          px: 4,
          background: "#181a20",
          alignItems: "center",
          order: 5,
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: "30px", fontFamily: "Space Grotesk", color: "white", fontWeight: 500, mb: 4 }}
        >
          Events waiting your attention!
        </Typography>
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="center"
          gap={4}
          className="card-wrapper"
        >
          {eventsData.map((event: EventData) => (
            <EventCard event={event} key={event.eventTitle} />
          ))}
        </Stack>
      </Stack>
    );
  }
};

export default Events;
