import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'cloud',
  },
  cloud: {
    project: 'commercequest/cq-astro',
  },
  ui: {
    brand: {
      name: 'CommerceQuest Admin',      
    },
  },
  collections: {
    freelancers: collection({
      label: 'Freelancers',
      path: 'src/content/freelancers/*',
      slugField: 'slug',
      schema: {
        firstName: fields.text({
          label: "First Name",
          validation: { length: { min: 1 } }
        }),
        lastName: fields.text({
          label: "Last Name",
          validation: { length: { min: 1 } }
        }),
        slug: fields.text({
          label: "Slug",
          validation: { length: { min: 1 } }
        }),
        photo: fields.image({
          label: "Photo",
          directory: "src/images/freelancers",
          publicPath: "/src/images/freelancers",
          validation: { isRequired: true }
        }),
        headline: fields.text({
          label: "Headline",
        }),
        availability: fields.text({
          label: "Availability",
          validation: { isRequired: true }
        }),
        location: fields.text({
          label: "Location",
          validation: { isRequired: true, length: { min: 1 } }
        }),
        countryCode: fields.text({
          label: "Country Code",
          validation: { length: { min: 2, max: 2 } }
        }),
        language: fields.text({
          label: "Languages",
          validation: { isRequired: true }
        }),
        shortPitch: fields.text({
          label: "Short Pitch",
          multiline: true,
        }),
        linkedIn: fields.url({
          label: "LinkedIn URL",
        }),
        github: fields.url({
          label: "GitHub URL",
        }),
        certifications: fields.multiselect({
          label: "Certifications",
          options: [
            { label: "Backend Developer Certified", value: "Backend Developer" },
            { label: "Solution Architect Certified", value: "Solution Architect" }
          ],
        }),
        sprykerCertifications: fields.text({
          label: "Spryker Certifications",
          multiline: true,
        }),
        skills: fields.multiselect({
          label: "Skills",
          options: [
            { label: "Frontend", value: "Frontend" },
            { label: "Back End", value: "Back End" },
            { label: "Architecture", value: "Architecture" },
            { label: "Project Management", value: "Project Management" },
            { label: "Fullstack", value: "Fullstack" },
            { label: "Team Lead", value: "Team Lead" },
            { label: "Tech Lead", value: "Tech Lead" }
          ]
        }),
        timezoneRange: fields.text({
          label: "Timezone Range",
        }),
        yearStartedWebDev: fields.integer({
          label: "Year Started Web Development",
          validation: { min: 1980, max: 2050 }
        }),
        yearStartedSpryker: fields.integer({
          label: "Year Started with Spryker",
          validation: { min: 1980, max: 2050 }
        }),
        references: fields.text({
          label: "References",
          multiline: true,
        }),
        idealCustomer: fields.text({
          label: "Ideal Customer",
          multiline: true,
        }),
        locationFlexibility: fields.text({
          label: "Location Flexibility",
        }),
        otherCertifications: fields.text({
          label: "Other Certifications",
        }),
        employmentType: fields.text({
          label: "Employment Type",
        }),
        contact: fields.text({
          label: "Contact Email",
          validation: { length: { min: 1 } }
        }),
        forumProfile: fields.url({
          label: "Forum Profile URL",
        }),
        isVisible: fields.checkbox({
          label: "Is Visible",
          defaultValue: true,
        }),
      },
    }),
  },
});
