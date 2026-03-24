import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 45, fontFamily: 'Times-Roman', fontSize: 11, color: '#000', lineHeight: 1.4 },
  header: { marginBottom: 20, textAlign: 'center', borderBottomWidth: 1, paddingBottom: 10, position: 'relative' },
  photo: { width: 60, height: 60, position: 'absolute', left: 0, top: 0, objectFit: 'cover' },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  contact: { fontSize: 10, marginBottom: 5, lineHeight: 1.5 },
  section: { marginBottom: 15 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 8, marginTop: 10 },
  itemGroup: { marginBottom: 10 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  itemTitle: { fontWeight: 'bold', fontSize: 11 },
  itemSubtitle: { fontStyle: 'italic', fontSize: 11 },
  itemDate: { fontSize: 10 },
  text: { fontSize: 10, textAlign: 'justify' },
  skills: { fontSize: 10, lineHeight: 1.5 },
  bulletList: { marginTop: 4 },
  bulletItem: { flexDirection: 'row', marginBottom: 2 },
  bulletPoint: { width: 10, fontSize: 10 },
  bulletContent: { flex: 1, fontSize: 10 }
});

const formatDescription = (desc, themeColor) => {
  if (!desc) return null;
  const lines = desc.split('\n');
  return (
    <View style={styles.bulletList}>
      {lines.map((line, i) => {
        const text = line.startsWith('•') ? line.substring(1).trim() : line.trim();
        if (!text) return null;
        return (
          <View key={i} style={styles.bulletItem}>
            <Text style={[styles.bulletPoint, { color: themeColor }]}>•</Text>
            <Text style={styles.bulletContent}>{text}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default function ClassicTemplate({ data, themeColor = '#0f172a' }) {
  if (!data) return null;
  const { personalInfo, photoUrl, summary, experience, education, projects, certificates, achievements, skills } = data;

  const contactText = [
    personalInfo?.email,
    personalInfo?.phone,
  ].filter(Boolean).join(' • ');

  const profiles = [
    { label: 'LinkedIn', url: personalInfo?.linkedin },
    { label: 'GitHub', url: personalInfo?.github },
  ].filter(p => p.url);

  const formatUrl = (url) => url.startsWith('http') ? url : `https://${url}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.header, { borderBottomColor: themeColor }]}>
          {photoUrl && <Image src={photoUrl} style={styles.photo} />}
          <Text style={[styles.name, { color: themeColor }]}>{personalInfo?.fullName || 'Your Name'}</Text>
          <Text style={styles.contact}>{contactText || 'email@email.com • (123) 456-7890'}</Text>
          {personalInfo?.title && <Text style={styles.contact}>{personalInfo.title}</Text>}
          
          {profiles.length > 0 && (
            <View style={{ flexDirection: 'row', marginTop: 8, gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              {profiles.map((p, i) => (
                <Link key={i} src={formatUrl(p.url)} style={{ fontSize: 10, color: themeColor, textDecoration: 'underline' }}>
                  {p.label}
                </Link>
              ))}
            </View>
          )}
        </View>

        {summary && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Summary</Text>
            <Text style={styles.text}>{summary}</Text>
          </View>
        )}

        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Professional Experience</Text>
            {experience.map((exp, i) => (
              <View key={i} style={styles.itemGroup}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{exp.title}</Text>
                  <Text style={styles.itemDate}>{exp.startDate} - {exp.endDate}</Text>
                </View>
                <Text style={styles.itemSubtitle}>{exp.company}</Text>
                {formatDescription(exp.description, themeColor)}
              </View>
            ))}
          </View>
        )}

        {education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Education</Text>
            {education.map((edu, i) => (
              <View key={i} style={styles.itemGroup}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{edu.degree}</Text>
                  <Text style={styles.itemDate}>{edu.startDate} - {edu.endDate}</Text>
                </View>
                <Text style={styles.itemSubtitle}>{edu.school}</Text>
              </View>
            ))}
          </View>
        )}

        {projects && projects.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Projects</Text>
            {projects.map((proj, i) => (
              <View key={i} style={styles.itemGroup}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{proj.title}</Text>
                  {proj.link && <Text style={styles.itemDate}>{proj.link}</Text>}
                </View>
                <Text style={styles.text}>{proj.description}</Text>
              </View>
            ))}
          </View>
        )}

        {certificates && certificates.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Certificates</Text>
            {certificates.map((cert, i) => (
              <View key={i} style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{cert.name} <Text style={styles.itemSubtitle}>- {cert.issuer}</Text></Text>
                <Text style={styles.itemDate}>{cert.date}</Text>
              </View>
            ))}
          </View>
        )}

        {achievements && achievements.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Key Achievements</Text>
            <View style={styles.bulletList}>
              {achievements.map((ach, i) => (
                <View key={i} style={styles.bulletItem}>
                  <Text style={[styles.bulletPoint, { color: themeColor }]}>•</Text>
                  <Text style={styles.bulletContent}>{ach}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Technical Skills</Text>
            <Text style={styles.skills}>{skills.join(' • ')}</Text>
          </View>
        )}

        {/* Custom Portions */}
        {data.customSections && data.customSections.length > 0 && (
          <View style={styles.section}>
            {data.customSections.map((section, idx) => (
              <View key={idx} style={styles.itemGroup} wrap={false}>
                <Text style={[styles.sectionTitle, { color: themeColor }]}>{section.title}</Text>
                <Text style={styles.text}>{section.description}</Text>
              </View>
            ))}
          </View>
        )}

      </Page>
    </Document>
  );
}
