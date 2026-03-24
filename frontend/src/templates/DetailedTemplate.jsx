import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', fontSize: 11, color: '#000', lineHeight: 1.5 },
  resumeTitle: { textAlign: 'center', fontSize: 16, fontWeight: 'bold', textDecoration: 'underline', marginBottom: 20, textTransform: 'uppercase' },
  
  // Header block
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 15 },
  leftHeader: { width: '40%', alignItems: 'flex-start' },
  photo: { width: 85, height: 105, border: '1pt solid #333', marginBottom: 10, objectFit: 'cover' },
  name: { fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', lineHeight: 1.2 },
  
  rightHeader: { width: '55%', alignItems: 'flex-end', textAlign: 'right' },
  addressTitle: { fontSize: 11, fontWeight: 'bold', textDecoration: 'underline', marginBottom: 6 },
  contactLine: { fontSize: 10, marginBottom: 3, lineHeight: 1.4 },
  
  // Sections
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 6 },
  text: { fontSize: 11, textAlign: 'justify' },
  
  // Lists
  orderedList: { marginTop: 4 },
  listItem: { flexDirection: 'row', marginBottom: 3 },
  listIndex: { width: 20, fontSize: 11, textAlign: 'right', paddingRight: 6 },
  listContent: { flex: 1, fontSize: 11 },
  
  // Personal Details
  pdRow: { flexDirection: 'row', marginBottom: 3 },
  pdLabel: { width: 120, fontSize: 11 },
  pdColon: { width: 20, fontSize: 11 },
  pdValue: { flex: 1, fontSize: 11 },

  // Declaration
  declarationText: { fontSize: 11, marginTop: 4, textAlign: 'justify', lineHeight: 1.5 },
  
  // Footer signature area
  footer: { marginTop: 40 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 },
  placeDateBox: { width: '50%' },
  signatureBox: { width: '50%', alignItems: 'flex-end', justifyContent: 'flex-end' }
});

export default function DetailedTemplate({ data, themeColor = '#1e3a8a' }) {
  if (!data) return null;
  const { personalInfo, photoUrl, summary, experience, education, strengths, hobbies, extended } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={[styles.resumeTitle, { color: themeColor }]}>RESUME</Text>

        <View style={styles.headerRow}>
          <View style={styles.leftHeader}>
            {photoUrl ? (
              <Image src={photoUrl} style={styles.photo} />
            ) : (
              <View style={{...styles.photo, backgroundColor: '#f3f4f6'}} />
            )}
            <Text style={[styles.name, { color: themeColor }]}>{personalInfo?.fullName || 'Your Name'}</Text>
          </View>
          
          <View style={styles.rightHeader}>
            <Text style={[styles.addressTitle, { color: themeColor }]}>Permanent Address</Text>
            {personalInfo?.address ? (
              <Text style={styles.contactLine}>{personalInfo.address}</Text>
            ) : (
              <Text style={styles.contactLine}>Address line 1{'\n'}Address line 2{'\n'}City, State</Text>
            )}
            <Text style={{...styles.contactLine, marginTop: 4}}>Email: {personalInfo?.email || 'email@example.com'}</Text>
            <Text style={styles.contactLine}>Mob. No.: {personalInfo?.phone || '1234567890'}</Text>
            {personalInfo?.linkedin && <Text style={styles.contactLine}>LinkedIn: {personalInfo.linkedin}</Text>}
            {personalInfo?.github && <Text style={styles.contactLine}>GitHub: {personalInfo.github}</Text>}
          </View>
        </View>

        {summary && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>CAREER OBJECTIVE:</Text>
            <Text style={styles.text}>{summary}</Text>
          </View>
        )}

        {education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={{...styles.sectionTitle, textTransform: 'uppercase', color: themeColor }}>ACADEMIC QUALIFICATION:</Text>
            <View style={styles.orderedList}>
              {education.map((edu, i) => (
                <View key={i} style={styles.listItem}>
                  <Text style={[styles.listIndex, { color: themeColor }]}>{i + 1}.</Text>
                  <Text style={styles.listContent}>
                    {edu.degree} from {edu.school} {edu.startDate && `in ${edu.startDate}`}{edu.endDate && `-${edu.endDate}`}.
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>EXPERIENCE:</Text>
            <View style={styles.orderedList}>
              {experience.map((exp, i) => (
                <View key={i} style={styles.listItem}>
                  <Text style={[styles.listIndex, { color: themeColor }]}>{i + 1}.</Text>
                  <Text style={styles.listContent}>
                    {exp.title} at {exp.company}{exp.startDate && ` from ${exp.startDate}`}{exp.endDate && ` to ${exp.endDate}`}.
                    {exp.description ? `\n${exp.description}` : ''}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {strengths && strengths.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>STRENGTHS:</Text>
            <View style={styles.orderedList}>
              {strengths.map((s, i) => (
                <View key={i} style={styles.listItem}>
                  <Text style={[styles.listIndex, { color: themeColor }]}>{i + 1}</Text>
                  <Text style={styles.listContent}>{s}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {hobbies && hobbies.length > 0 && (
          <View style={styles.section}>
            <Text style={{...styles.sectionTitle, textTransform: 'none', color: themeColor }}>Hobbies and Interests:</Text>
            <View style={styles.orderedList}>
              {hobbies.map((h, i) => (
                <View key={i} style={styles.listItem}>
                  <Text style={[styles.listIndex, { color: themeColor }]}>{i + 1}.</Text>
                  <Text style={styles.listContent}>{h}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Custom Portions */}
        {data.customSections && data.customSections.length > 0 && (
          <View style={styles.section}>
            {data.customSections.map((section, idx) => (
              <View key={idx} style={{ marginBottom: 12 }}>
                <Text style={[styles.sectionTitle, { color: themeColor }]}>{section.title}:</Text>
                <Text style={styles.text}>{section.description}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.section} wrap={false}>
          <Text style={[styles.sectionTitle, { color: themeColor }]}>PERSONAL DETAILS:</Text>
          
          <View style={styles.pdRow}><Text style={styles.pdLabel}>Father's Name</Text><Text style={styles.pdColon}>:</Text><Text style={styles.pdValue}>{extended?.fatherName || ''}</Text></View>
          <View style={styles.pdRow}><Text style={styles.pdLabel}>Date of Birth</Text><Text style={styles.pdColon}>:</Text><Text style={styles.pdValue}>{extended?.dob || ''}</Text></View>
          <View style={styles.pdRow}><Text style={styles.pdLabel}>Marital Status</Text><Text style={styles.pdColon}>:</Text><Text style={styles.pdValue}>{extended?.maritalStatus || ''}</Text></View>
          <View style={styles.pdRow}><Text style={styles.pdLabel}>Known Language</Text><Text style={styles.pdColon}>:</Text><Text style={styles.pdValue}>{extended?.languages || ''}</Text></View>
          <View style={styles.pdRow}><Text style={styles.pdLabel}>Nationality</Text><Text style={styles.pdColon}>:</Text><Text style={styles.pdValue}>{extended?.nationality || 'Indian'}</Text></View>
          <View style={styles.pdRow}><Text style={styles.pdLabel}>Gender</Text><Text style={styles.pdColon}>:</Text><Text style={styles.pdValue}>{extended?.gender || ''}</Text></View>
          <View style={styles.pdRow}><Text style={styles.pdLabel}>Religion</Text><Text style={styles.pdColon}>:</Text><Text style={styles.pdValue}>{extended?.religion || ''}</Text></View>
        </View>

        {extended?.includeDeclaration !== false && (
          <View style={styles.section} wrap={false}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Declaration:</Text>
            <Text style={styles.declarationText}>
              I here certify that the above information is true and correct to the best of my knowledge and I assure you sir, that if I am given a chance to service under you, I work diligently and honestly.
            </Text>
            
            <View style={styles.footer}>
              <Text style={{ marginBottom: 15 }}>Place _________________</Text>
              <Text>Date _________________</Text>
              <View style={styles.footerRow}>
                <View style={styles.placeDateBox} />
                <View style={styles.signatureBox}>
                  <Text>({(personalInfo?.fullName || 'YOUR NAME').toUpperCase()})</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}
