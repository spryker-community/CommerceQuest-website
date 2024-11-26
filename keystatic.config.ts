import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'spryker-community',
      name: 'commercequest-website',
      branch: 'main'  // Explicitly set the branch
    },
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
      format: 'yaml',
      schema: {
        firstName: fields.text({ 
          label: "First Name",
          validation: { length: { min: 1 } }
        }),
        lastName: fields.text({ 
          label: "Last Name",
          validation: { length: { min: 1 } }
        }),
        photo: fields.text({ 
          label: "Photo",
          validation: { length: { min: 1 } }
        }),
        headline: fields.text({ 
          label: "Headline"
        }),
        availability: fields.text({ 
          label: "Availability",
          validation: { length: { min: 1 } }
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
          validation: { length: { min: 1 } }
        }),
        shortPitch: fields.text({ 
          label: "Short Pitch",
          multiline: true
        }),
        linkedIn: fields.url({ 
          label: "LinkedIn URL"
        }),
        github: fields.url({ 
          label: "GitHub URL"
        }),
        sprykerCertifications: fields.text({ 
          label: "Spryker Certifications",
          multiline: true
        }),
        skills: fields.array(
          fields.select({
            label: "Skill",
            options: [
              { label: "Frontend", value: "Frontend" },
              { label: "Back End", value: "Back End" },
              { label: "Architecture", value: "Architecture" },
              { label: "Project Management", value: "Project Management" },
              { label: "Fullstack", value: "Fullstack" },
              { label: "Team Lead", value: "Team Lead" },
              { label: "Tech Lead", value: "Tech Lead" }
            ],
            defaultValue: "Back End"
          }),
          { 
            label: "Skills",
            itemLabel: props => props.value
          }
        ),
        timezoneRange: fields.text({ 
          label: "Timezone Range"
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
          multiline: true
        }),
        idealCustomer: fields.text({ 
          label: "Ideal Customer",
          multiline: true
        }),
        locationFlexibility: fields.text({ 
          label: "Location Flexibility"
        }),
        otherCertifications: fields.text({ 
          label: "Other Certifications"
        }),
        employmentType: fields.text({ 
          label: "Employment Type"
        }),
        contact: fields.text({ 
          label: "Contact Email",
          validation: { length: { min: 1 } }
        }),
        forumProfile: fields.url({ 
          label: "Forum Profile URL"
        }),
        isVisible: fields.checkbox({ 
          label: "Is Visible",
          defaultValue: true
        })
      }
    })
  }
});
