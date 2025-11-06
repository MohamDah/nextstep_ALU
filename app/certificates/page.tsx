import React from 'react';
import Layout from '../../components/Layout';
import { Card, Button } from '../../components/ui';

export default function CertificatesPage() {
  // Mock data for certificates
  const certificates = [
    {
      id: 1,
      title: 'Digital Marketing Fundamentals',
      completedDate: '2024-10-15',
      instructor: 'Sarah Mwangi',
      grade: 'A+',
      credentialId: 'DM001-2024-10-15',
      skills: ['SEO', 'Social Media Marketing', 'Content Strategy', 'Analytics'],
      issueDate: '2024-10-15',
      validUntil: 'Never expires',
      verified: true,
    },
    {
      id: 2,
      title: 'Basic Computer Skills',
      completedDate: '2024-09-28',
      instructor: 'Michael Oduya',
      grade: 'A',
      credentialId: 'BCS001-2024-09-28',
      skills: ['Microsoft Office', 'File Management', 'Internet Safety', 'Email'],
      issueDate: '2024-09-28',
      validUntil: 'Never expires',
      verified: true,
    },
  ];

  const inProgressCourses = [
    {
      id: 3,
      title: 'Web Development Basics',
      progress: 75,
      estimatedCompletion: '2024-11-30',
      instructor: 'Ahmed Hassan',
    },
    {
      id: 4,
      title: 'Mobile App Development',
      progress: 45,
      estimatedCompletion: '2024-12-15',
      instructor: 'Grace Otieno',
    },
  ];

  const handleDownload = (certificateId: number, format: string) => {
    // In a real app, this would generate and download the certificate
    alert(`Downloading certificate ${certificateId} as ${format}`);
  };

  const handleShare = (certificateId: number, platform: string) => {
    // In a real app, this would share the certificate on social media
    alert(`Sharing certificate ${certificateId} on ${platform}`);
  };

  const handleVerify = (credentialId: string) => {
    // In a real app, this would open a verification page
    alert(`Verifying certificate with ID: ${credentialId}`);
  };

  return (
    <Layout title="My Certificates" userRole="learner">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">My Certificates</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Showcase your achievements and skills to potential employers. All certificates are 
            digitally verified and globally recognized.
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <div className="text-3xl font-bold text-success">{certificates.length}</div>
            <div className="text-sm text-gray-600">Certificates Earned</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-nextstep-primary">{inProgressCourses.length}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-nextstep-secondary">
              {certificates.reduce((total, cert) => total + cert.skills.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Skills Verified</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-warning">100%</div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </Card>
        </div>

        {/* Earned Certificates */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Earned Certificates</h2>
          
          {certificates.length > 0 ? (
            <div className="space-y-4">
              {certificates.map(cert => (
                <Card key={cert.id} className="hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-6">
                    {/* Certificate Badge */}
                    <div className="shrink-0">
                      <div className="w-20 h-20 bg-linear-to-br from-nextstep-primary to-nextstep-secondary rounded-lg flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">🏆</span>
                      </div>
                    </div>

                    {/* Certificate Details */}
                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{cert.title}</h3>
                          <p className="text-sm text-gray-600">
                            Completed on {new Date(cert.completedDate).toLocaleDateString()} • 
                            Instructor: {cert.instructor}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="bg-success text-white px-3 py-1 rounded-full text-sm font-medium mb-1">
                            Grade: {cert.grade}
                          </div>
                          {cert.verified && (
                            <div className="flex items-center space-x-1 text-xs text-success">
                              <span>✓</span>
                              <span>Verified</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Skills */}
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Skills Validated:</p>
                        <div className="flex flex-wrap gap-2">
                          {cert.skills.map((skill, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-success bg-opacity-10 text-success text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Certificate Info */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-500">
                        <div>
                          <span className="font-medium">Credential ID:</span>
                          <br />
                          <span className="font-mono">{cert.credentialId}</span>
                        </div>
                        <div>
                          <span className="font-medium">Issue Date:</span>
                          <br />
                          {new Date(cert.issueDate).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Valid Until:</span>
                          <br />
                          {cert.validUntil}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        <Button 
                          variant="primary" 
                          size="sm" 
                          onClick={() => handleDownload(cert.id, 'PDF')}
                        >
                          Download PDF
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          onClick={() => handleShare(cert.id, 'LinkedIn')}
                        >
                          Share on LinkedIn
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          onClick={() => handleVerify(cert.credentialId)}
                        >
                          Verify Certificate
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-8">
              <div className="text-6xl mb-4">🎓</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No certificates yet</h3>
              <p className="text-gray-600 mb-4">
                Complete your first course to earn your first certificate!
              </p>
              <Button variant="primary">
                Browse Courses
              </Button>
            </Card>
          )}
        </div>

        {/* Courses in Progress */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Courses in Progress</h2>
          
          {inProgressCourses.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {inProgressCourses.map(course => (
                <Card key={course.id}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <div>{course.progress}% complete</div>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-nextstep-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">
                        Est. completion: {new Date(course.estimatedCompletion).toLocaleDateString()}
                      </span>
                      <Button variant="primary" size="sm">
                        Continue
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-6">
              <p className="text-gray-600">No courses in progress. Start learning to earn certificates!</p>
              <Button variant="primary" className="mt-3">
                Browse Courses
              </Button>
            </Card>
          )}
        </div>

        {/* Certificate Benefits */}
        <Card className="bg-nextstep-primary bg-opacity-10 border-nextstep-primary">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Why NextStep Africa Certificates Matter</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <span className="text-success text-lg">✓</span>
                <div>
                  <div className="font-medium">Globally Recognized</div>
                  <div className="text-gray-600">Accepted by employers across Africa and internationally</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-success text-lg">✓</span>
                <div>
                  <div className="font-medium">Industry Relevant</div>
                  <div className="text-gray-600">Skills that match current job market demands</div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <span className="text-success text-lg">✓</span>
                <div>
                  <div className="font-medium">Digitally Verified</div>
                  <div className="text-gray-600">Blockchain-secured for authentic verification</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-success text-lg">✓</span>
                <div>
                  <div className="font-medium">Career Ready</div>
                  <div className="text-gray-600">Practical skills that open employment opportunities</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}