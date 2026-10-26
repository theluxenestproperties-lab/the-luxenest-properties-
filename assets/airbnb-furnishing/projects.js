/*
 * LUXENEST PROPERTIES: AIRBNB FURNISHING & STAGING PORTFOLIO
 * ----------------------------------------------------------
 * This is the ONLY file you need to edit to add or re-arrange projects.
 *
 * HOW TO ADD A PHOTO PAIR (or a single "after" photo)
 * 1. Make two WebP copies of each photo and put them in /assets/airbnb-furnishing/img/
 *      my-room-before-full.webp   (full size, keep the original pixel size, never enlarge)
 *      my-room-before-800.webp    (card size, 800px wide)
 *      my-room-after-full.webp
 *      my-room-after-800.webp
 *    The "before" and "after" photos of a pair must have the SAME pixel size
 *    and framing, so the slider lines up and nothing is cropped.
 * 2. Copy one of the project blocks in "projects" below and change:
 *      id          a short unique name (letters and dashes)
 *      category    living | bedroom | kitchen | bathroom
 *      title, description
 *      before, after   the file name WITHOUT "-full.webp" / "-800.webp"
 *                      (leave "before" out for a single "after" photograph)
 *      width, height   the photo's real pixel size
 * 3. Save, commit and push.
 *
 * HOW TO SHOW A COMPLETE PROJECT
 * Add (or edit) a block in "groups" at the bottom and list the project ids that
 * belong together. Groups are shown under the "Complete Airbnb Furnishing
 * Projects" tab. A tab only appears when it has something to show.
 *
 * The order below is the order on the page.
 */

window.LUXENEST_PORTFOLIO = {
  imageBase: "../../assets/airbnb-furnishing/img/",

  categories: [
    { id: "living",   label: "Living Room Transformations" },
    { id: "bedroom",  label: "Bedroom Transformations" },
    { id: "kitchen",  label: "Kitchen Styling" },
    { id: "bathroom", label: "Bathroom Styling" }
  ],

  projects: [
    {
      id: "living-room",
      category: "living",
      title: "Open-Plan Living & Dining",
      description: "An empty, neutral living space becomes a warm, welcoming lounge and dining area, with curved textured seating, a sculptural dark dining table, soft curtains and a rug that anchors the room and frames the balcony view.",
      before: "living-room-before",
      after: "living-room-after",
      width: 1536, height: 1024,
      altBefore: "Empty living room with tiled floor, chandelier and sliding balcony door, before furnishing",
      altAfter: "Furnished living and dining area with curved cream sofa, round dark dining table, chandelier and balcony view"
    },
    {
      id: "main-bedroom",
      category: "bedroom",
      title: "Main Bedroom",
      description: "A blank bedroom becomes a calm retreat: an upholstered headboard, crisp white linen, warm terracotta and taupe accents, bedside lighting and framed abstract art.",
      before: "main-bedroom-before",
      after: "main-bedroom-after",
      width: 1536, height: 1024,
      altBefore: "Empty main bedroom with built-in white wardrobes and tiled floor, before furnishing",
      altAfter: "Furnished main bedroom with upholstered bed, white linen, knitted throw, bedside lamps and framed art"
    },
    {
      id: "kitchen-lounge",
      category: "kitchen",
      title: "Open-Plan Kitchen & Lounge",
      description: "A bare open-plan kitchen and lounge comes to life, with tan leather bar stools at the stone counter, a relaxed seating area on a textured rug, a feature plant and a styled TV wall.",
      before: "kitchen-lounge-before",
      after: "kitchen-lounge-after",
      width: 1536, height: 1024,
      altBefore: "Empty open-plan kitchen and lounge with stone counter and balcony door, before furnishing",
      altAfter: "Furnished open-plan kitchen and lounge with leather bar stools, sofa, armchair, rug and feature plant"
    },
    {
      id: "twin-bedroom",
      category: "bedroom",
      title: "Twin Guest Bedroom",
      description: "From an empty room with a duvet, cushion and artwork still waiting to be unpacked to two beautifully dressed single beds, layered throws, floor-length curtains and a woven rug, flexible for friends, families or colleagues.",
      before: "twin-bedroom-before",
      after: "twin-bedroom-after",
      width: 1536, height: 1024,
      altBefore: "Empty bedroom with curtains and tiled floor, with a duvet, cushion and framed artwork waiting to be set up",
      altAfter: "Furnished twin bedroom with two beds, layered throws, floor-length curtains and framed abstract art"
    },
    {
      id: "bathroom-stone",
      category: "bathroom",
      title: "Stone-Tile Bathroom",
      description: "An unfinished bathroom becomes a polished, guest-ready space, with a backlit mirror, matte black fittings, styled vanity accessories and fresh greenery.",
      before: "bathroom-stone-before",
      after: "bathroom-stone-after",
      width: 1086, height: 1448,
      altBefore: "Bathroom with stone tiles, glass shower and black vanity before styling, with the mirror and accessories not yet installed",
      altAfter: "Styled bathroom with backlit oval mirror, black floating vanity, glass shower, diffuser and eucalyptus"
    },
    {
      id: "bathroom",
      category: "bathroom",
      title: "Boutique-Style Bathroom",
      description: "A bathroom with the vanity still to be installed becomes a boutique-hotel moment: a floating vanity, backlit mirror, fresh towels, a reed diffuser, hand wash and flowers.",
      before: "bathroom-before",
      after: "bathroom-after",
      width: 1536, height: 1024,
      altBefore: "Bathroom with glass shower and toilet, with the vanity yet to be installed and plumbing exposed on the wall",
      altAfter: "Styled bathroom with floating vanity, backlit mirror, towels, diffuser, hand wash and walk-in shower"
    },
    {
      id: "kitchen-drawer",
      category: "kitchen",
      title: "Fully Equipped Kitchen",
      description: "Cookware, ceramic mugs, plates, wine glasses and tumblers are organised in a fitted drawer, so guests can cook and entertain from the first night.",
      after: "kitchen-drawer-after",
      width: 1536, height: 1024,
      altAfter: "Open kitchen drawer neatly organised with pots, mugs, plates, wine glasses and tumblers"
    },
    {
      id: "tea-coffee-station",
      category: "kitchen",
      title: "Welcome Tea & Coffee Station",
      description: "A labelled tea, coffee, sugar and honey station beside the kettle, a small detail that makes guests feel looked after.",
      after: "tea-coffee-station-after",
      width: 1536, height: 1024,
      altAfter: "Tea and coffee station with labelled jars, sachets in a tray, kettle and bread bin on a stone counter"
    }

    /* Add the next project here. Remember the comma after the previous one. */
  ],

  /* COMPLETE PROJECTS: shown under the "Complete Airbnb Furnishing Projects" tab.
     "projects" lists the ids from above that belong to the same property. */
  groups: [
    {
      id: "complete-apartment-1",
      title: "Complete Apartment Furnishing: Living Room, Bathroom & Twin Bedroom",
      description: "An empty apartment taken from bare walls and tile to a fully furnished, guest-ready Airbnb, with a cohesive palette of warm neutrals and charcoal carried through every room.",
      projects: ["living-room", "bathroom", "twin-bedroom"]
    },
    {
      id: "complete-apartment-2",
      title: "Complete Apartment Furnishing: Kitchen, Lounge & Main Bedroom",
      description: "A second apartment furnished from empty to exceptional, from the open-plan kitchen and lounge to the main bedroom, with the practical details guests notice, such as a fully equipped kitchen and a welcome tea and coffee station.",
      projects: ["kitchen-lounge", "main-bedroom", "kitchen-drawer", "tea-coffee-station"]
    }
  ]
};
