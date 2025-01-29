import type { Config } from '@keystatic/core';
import { fields, collection } from '@keystatic/core';

const keystaticConfig: Config = {
  storage: {
    kind: 'local',
    repo: {
      owner: 'spryker-community',
      name: 'commercequest-website',
    },
    branchPrefix: 'keystatic/'
  },
  ui: {
    brand: {
      name: 'CommerceQuest Admin',
    },
  },
  collections: {
    'freelancers': collection({
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
          validation: {
            length: { min: 1 },
            pattern: {
              regex: /^[a-z0-9-]+$/,
              message: 'Please provide alphanumeric characters in lowercase and `-`.',
            }
          }
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
    'community-tools': collection({
      label: 'Community Tools',
      path: 'src/content/community-tools/*',
      slugField: 'title',
      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
            validation: {
              isRequired: true,
              length: { min: 6 }
            }
          },
          slug: {
            label: 'SEO-friendly title',
            description: 'This will define the file name for this entry'
          }
        }),
        subtitle: fields.text({
          label: "Subtitle",
          description: 'Optional subtitle to support the title',
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
        }),
        tags: fields.array(
          fields.text({
            label: 'Tag',
            validation: {
              isRequired: true,
              length: { min: 3 }
            }
          }),
          {
            label: 'Tags',
            itemLabel: props => props.value
          }
        ),
        license: fields.text({
          label: "License",
          validation: {
            isRequired: true,
          }
        }),
        creators: fields.array(
          fields.object({
            name: fields.text({
              label: 'Name',
              validation: {
                isRequired: true,
              }
            }),
            url: fields.url({ label: 'URL' }),
          }),
          {
            label: 'Creators',
            itemLabel: (props) => `${props.fields.name.value} -> ${props.fields.url.value}`,
            validation: { length: { min: 1 } }
          }
        ),
        contributors: fields.array(
          fields.object({
            name: fields.text({
              label: 'Name',
              validation: {
                isRequired: true,
              }
            }),
            url: fields.url({ label: 'URL' }),
          }),
          {
            label: 'Contributors',
            itemLabel: (props) => `${props.fields.name.value} -> ${props.fields.url.value}`,
          }
        ),
        links: fields.array(
          fields.object({
            label: fields.text({
              label: 'Label',
              validation: {
                isRequired: true,
              }
            }),
            url: fields.url({
              label: 'URL',
              validation: {
                isRequired: true,
              }
            }),
          }),
          {
            label: 'Links',
            itemLabel: (props) => `${props.fields.label.value} -> ${props.fields.url.value}`,
            validation: { length: { min: 1 } }
          }
        ),
      },
    }),
  },
};
export default keystaticConfig;
