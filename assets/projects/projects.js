/* ============================================================
   LUXENEST – FURNISHING PORTFOLIO DATA
   To add a project: upload the photo(s) to /assets/projects/
   and copy one block below. Photos should be the same 3:2 ratio.

   category: living | bedroom | kitchen | bathroom | complete
   type:     "compare" (needs before + after)  or  "single" (needs after only)
   ============================================================ */
window.LUXENEST_CATEGORIES = [
  {id:'all',      label:'All Projects'},
  {id:'living',   label:'Living Room Transformations'},
  {id:'bedroom',  label:'Bedroom Transformations'},
  {id:'kitchen',  label:'Kitchen Styling'},
  {id:'bathroom', label:'Bathroom Styling'},
  {id:'complete', label:'Complete Airbnb Furnishing Projects'}
];

window.LUXENEST_PROJECTS = [
  {
    category:'living', type:'compare',
    title:'Open-Plan Living & Kitchen',
    before:'/assets/projects/living-before.jpg',
    after:'/assets/projects/living-after.jpg',
    description:'An empty open-plan space becomes a warm, guest-ready living area with a defined lounge, breakfast-bar seating, layered lighting and natural textures.'
  },
  {
    category:'bedroom', type:'compare',
    title:'Main Bedroom',
    before:'/assets/projects/bedroom-before.jpg',
    after:'/assets/projects/bedroom-after.jpg',
    description:'A bare bedroom is transformed into a calm, hotel-style retreat with an upholstered bed, crisp white linen, layered cushions and warm bedside lighting.'
  },
  {
    category:'kitchen', type:'single',
    title:'Guest-Ready Kitchen Drawers',
    after:'/assets/projects/kitchen-drawer-styled.jpg',
    description:'Cookware, crockery and glassware thoughtfully organised so guests can feel at home from the moment they arrive.'
  },
  {
    category:'kitchen', type:'single',
    title:'Welcome Tea & Coffee Station',
    after:'/assets/projects/kitchen-station-styled.jpg',
    description:'A styled, labelled tea and coffee station — a small touch that earns big reviews.'
  },
  {
    category:'bathroom', type:'single',
    title:'Styled Guest Bathroom',
    after:'/assets/projects/bathroom-styled.jpg',
    description:'Fresh towels, curated toiletries, fragrance and soft backlit lighting for a spa-like first impression.'
  }
  /* Complete Airbnb Furnishing Projects: add a block with category:'complete' when ready */
];
