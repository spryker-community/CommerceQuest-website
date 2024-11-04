import type { Config } from '@keystatic/core';
import { config, fields, collection } from '@keystatic/core';

const keystaticConfig: Config = {
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
      slugField: 'firstName',
      schema: {
        firstName: fields.slug({
          name: { label: "First Name" },
        }),
        lastName: fields.text({
          label: "Last Name",
          validation: { length: { min: 1 } }
        }),
        photo: fields.text({
          label: "Photo filename",
          validation: { length: { min: 1 } }
        }),
        headline: fields.text({
          label: "Headline",
        }),
        availability: fields.text({
          label: "Availability",
        }),
        location: fields.text({
          label: "Location",
          validation: { length: { min: 1 } }
        }),
        countryCode: fields.text({
          label: "Country Code",
          validation: { length: { min: 2, max: 2 } }
        }),
        language: fields.text({
          label: "Languages",
        }),
        shortPitch: fields.text({
          label: "Short Pitch",
          multiline: true,
        }),
        linkedIn: fields.text({
          label: "LinkedIn URL",
        }),
        github: fields.text({
          label: "GitHub URL",
        }),
        sprykerCertifications: fields.object({
          backEndDeveloper: fields.checkbox({
            label: "Backend Developer Certified",
            defaultValue: false,
          }),
          solutionArchitect: fields.checkbox({
            label: "Solution Architect Certified",
            defaultValue: false,
          }),
        }),
        skills: fields.array(
          fields.text({ label: "Skill" }),
          {
            label: "Skills",
            itemLabel: (props) => props.value,
          }
        ),
        timezoneRange: fields.text({
          label: "Timezone Range",
        }),
        yearStartedWebDev: fields.integer({
          label: "Year Started Web Development",
        }),
        yearStartedSpryker: fields.integer({
          label: "Year Started with Spryker",
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
        forumProfile: fields.text({
          label: "Forum Profile URL",
        }),
        isVisible: fields.checkbox({
          label: "Is Visible",
          defaultValue: true,
        }),
      },
    }),
  },
};

export default keystaticConfig;
