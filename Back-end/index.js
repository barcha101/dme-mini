require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT;
const cors = require('cors');

const uri = process.env.DB_CONNECTION;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

Schema = mongoose.Schema;


const leadSchema = new mongoose.Schema({
  fName: String,
  mName: String,
  lName: String,
  gender: { type: String, enum: ['male', 'female'] },
  isOnlineLead: Boolean,
  email: String,
  street: String,
  city: String,
  state: String,
  zip: String,
  phone: String,
  dob: {
    dob: Date,
    month: Number,
    day: Number,
    year: Number
  },
  height: String,
  weight: String,
  waist: String,
  braceSize: String,
  medicareId: String,
  privateInsName: String,
  privateInsId: String,
  painArea: [String],
  painLevel: Number,
  treatmentsTaking: String,
  chrnocIllness: String,
  diabetic: String,
  diabeticMedication: String,
  diabeticMedicationTime: String,
  branceLastFiveYears: Boolean,
  allergies: String,
  prescribedMedication: String,
  lastDocVisit: String,
  drName: String,
  drNPI: String,
  drPhone: String,
  drAddress: String,
  drCity: String,
  drState: String,
  drZip: String,
  drFax: String,
  comments: String,
  userMessage: String,
  sourceLink: String,
  notes: [{
    note: String,
    noteBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    noteOn: Date
    }],
  sourceFile: {
        uploadedBy: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        uploadedOn: Date,
        s3Key: String,
        fileName: String,
    },
  journeys: [{
        currentStatus: String,
        applicableStatuses: [{
            type: String
        }],
        order: {
            ordered: {
                type: String,
                enum: ['Yes', 'No']
            },
            noReason: String,
            supplies: [{
                painArea: String,
                supplyName: String,
                supplyId: {
                    type: Schema.Types.ObjectId
                },
                comment: String
            }],
            files: [{
                fileName: String,
                fileKey: String,
            }],
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        },
        orderUpdateHistory: [{
            ordered: {
                type: String,
                enum: ['Yes', 'No']
            },
            noReason: String,
            supplies: [{
                painArea: String,
                supplyName: String,
                supplyId: {
                    type: Schema.Types.ObjectId
                },
                comment: String
            }],
            files: [{
                fileName: String,
                fileKey: String,
            }],
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }],
        initialRecordings: {
            files: [{
                fileName: String,
                fileKey: String,
            }],
            comments: String,
            status: String,
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        },
        initialRecordingsHistory: [{
            files: [{
                fileName: String,
                fileKey: String,
            }],
            comments: String,
            status: String,
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }],
        clientAssignment: {
            client: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            comments: String,
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        },
        clientAssignmentHistory: [{
            client: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            comments: String,
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }],
        eligibility: {
            comments: String,
            coinsurance: String,
            deductable: String,
            effectiveDate: Date,
            termDate: Date,
            copay: String,
            status: String,
            privInsName: String,
            privInsId: String,
            supplies: [{
                painArea: String,
                supplyName: String,
                supplyId: {
                    type: Schema.Types.ObjectId
                },
                status: {
                    type: String,
                    enum: ['Pass', 'Failed']
                },
                comment: String
            }],
            cpts: [{
                painArea: String,
                supplyName: String,
                cptCode: String,
                desc: String,
                amount: Number,
                supplyId: {
                    type: Schema.Types.ObjectId
                }
            }],
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            on: Date
        },
        eligibilityHistory: [{
            comments: String,
            coinsurance: String,
            deductable: String,
            effectiveDate: Date,
            termDate: Date,
            copay: String,
            status: String,
            privInsName: String,
            privInsId: String,
            supplies: [{
                painArea: String,
                supplyName: String,
                supplyId: {
                    type: Schema.Types.ObjectId
                },
                status: {
                    type: String,
                    enum: ['Pass', 'Failed']
                },
                comment: String
            }],
            cpts: [{
                painArea: String,
                supplyName: String,
                cptCode: String,
                desc: String,
                amount: Number,
                supplyId: {
                    type: Schema.Types.ObjectId
                }
            }],
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            on: Date
        }],
        sns: {
            comments: String,
            supplies: [{            // this is old, we are not using it now    
                painArea: String,   
                supplyName: String,
                supplyId: {
                    type: Schema.Types.ObjectId
                },
                status: {
                    type: String,
                    enum: ['Yes', 'No']  //Yes for Recently billed and No for not billed yet
                },
                comment: String
            }],
            cpts: [{        // this contains passed cpts, those cpts which are not recently billed
                painArea: String,
                supplyName: String,
                cptCode: String,
                desc: String,
                amount: Number,
                supplyId: {
                    type: Schema.Types.ObjectId
                }
            }],
            cptStatuses: [{     // this is new, contains all cpts, wether they are recently billed or not
                cpt: String,
                isBilledRecently: {
                    type: String,
                    enum: ['Yes', 'No']
                },
                whenBilled: Date,
                billedBy: String
            }],
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            on: Date
        },
        snsHistory: [{
            comments: String,
            supplies: [{
                painArea: String,
                supplyName: String,
                supplyId: {
                    type: Schema.Types.ObjectId
                },
                status: {
                    type: String,
                    enum: ['Pass', 'Failed']
                },
                comment: String
            }],
            cpts: [{
                painArea: String,
                supplyName: String,
                cptCode: String,
                desc: String,
                amount: Number,
                supplyId: {
                    type: Schema.Types.ObjectId
                }
            }],
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            on: Date
        }],
        medicalRecordSent: {
            files: [{
                fileName: String,
                fileKey: String,
            }],
            comments: String,
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        },
        medicalRecordSentHistory: [{
            files: [{
                fileName: String,
                fileKey: String,
            }],
            comments: String,
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }],
        lastCheckedMedicalRR: Date,
        medicalRecordReceiveReminder: {
            type: Boolean,
            default: false
        },
        medicalRecordReceiveReminderComments: [{
            comments: String,
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }],
        medicalRecordReceived: {
            files: [{
                fileName: String,
                fileKey: String,
            }],
            comments: String,
            status: {
                type: String,
                enum: ['Accepted', 'Rejected']
            },
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        },
        medicalRecordReceivedHistory: [{
            files: [{
                fileName: String,
                fileKey: String,
            }],
            comments: String,
            status: {
                type: String,
                enum: ['Accepted', 'Rejected']
            },
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }],
        medicalRecordReview: {
            status: {
                type: String,
                enum: ['Accepted', 'Rejected']
            },
            comments: String,
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            supplies: [{
                painArea: String,
                supplyName: String,
                cptCode: String,
                desc: String,
                amount: Number,
                supplyId: {
                    type: Schema.Types.ObjectId
                },
                icdCode: String,
                icdDesc: String
            }],
            potentialOrder: [{
                painArea: String,
                supplyName: String,
                cptCode: String,
                desc: String,
                amount: Number,
                supplyId: {
                    type: Schema.Types.ObjectId
                },
                comment: String
            }],
        },
        medicalRecordReviewHistory: [{
            status: {
                type: String,
                enum: ['Accepted', 'Rejected']
            },
            comments: String,
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            supplies: [{
                painArea: String,
                supplyName: String,
                cptCode: String,
                desc: String,
                amount: Number,
                supplyId: {
                    type: Schema.Types.ObjectId
                },
                icdCode: String,
                icdDesc: String
            }],
            potentialOrder: [{
                painArea: String,
                supplyName: String,
                cptCode: String,
                desc: String,
                amount: Number,
                supplyId: {
                    type: Schema.Types.ObjectId
                },
                comment: String
            }],
        }],
        cmnSent: {
            files: [{
                fileName: String,
                fileKey: String,
            }],
            comments: String,
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        },
        cmnSentHistory: [{
            files: [{
                fileName: String,
                fileKey: String,
            }],
            comments: String,
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }],
        lastCheckedCmn: Date,
        CmnReceiveReminder: {
            type: Boolean,
            default: false
        },
        cmnReceiveReminderComments: [{
            comments: String,
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }],
        cmnReceived: {
            files: [{
                fileName: String,
                fileKey: String,
            }],
            comments: String,
            status: {
                type: String,
                enum: ['Accepted', 'Rejected']
            },
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        },
        cmnReceivedHistory: [{
            files: [{
                fileName: String,
                fileKey: String,
            }],
            comments: String,
            status: {
                type: String,
                enum: ['Accepted', 'Rejected']
            },
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }],
        cmnReview: {
            status: {
                type: String,
                enum: ['Accepted', 'Rejected']
            },
            comments: String,
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        },
        cmnReviewHistory: [{
            status: {
                type: String,
                enum: ['Accepted', 'Rejected']
            },
            comments: String,
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }],
        priorAuthorization: {
            files: [{
                fileName: String,
                fileKey: String,
            }],
            status: {
                type: String,
                enum: ['Accepted', 'Rejected', 'Not Required']
            },
            comments: String,
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        },
        priorAuthorizationHistory: [{
            files: [{
                fileName: String,
                fileKey: String,
            }],
            status: {
                type: String,
                enum: ['Accepted', 'Rejected','Not Required']
            },
            comments: String,
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }],
        providorAssignment: {
            providor: String,
            comments: String,
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        },
        providorAssignmentHistory: [{
            providor: String,
            comments: String,
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }],
        priorShippingCall: {
            files: [{
                fileName: String,
                fileKey: String,
            }],
            comments: String,
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        },
        priorShippingCallHistory: [{
            files: [{
                fileName: String,
                fileKey: String,
            }],
            comments: String,
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }],
        delivery: {
            files: [{
                fileName: String,
                fileKey: String,
            }],
            comments: String,
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        },
        deliveryHistory: [{
            files: [{
                fileName: String,
                fileKey: String,
            }],
            comments: String,
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }],
        lastCheckedDeliveryConfirmation: Date,
        deliveryConfirmationReminder: {
            type: Boolean,
            default: false
        },
        deliveryConfirmationComments: [{
            comments: String,
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }],
        deliveryConfirmation: {
            files: [{                   //old .. to be depreciated
                fileName: String,       //old .. to be depreciated
                fileKey: String,        //old .. to be depreciated
            }],                         //old .. to be depreciated
            deliveryDate: String,       //old .. to be depreciated
            trackingNum: String,        //old .. to be depreciated
            comments: String,           //old .. to be depreciated
            supplies: [{
                painArea: String,       //new .. from medical record review
                supplyName: String,     //new .. from medical record review
                cptCode: String,        //new .. from medical record review
                desc: String,           //new .. from medical record review
                amount: Number,         //new .. from medical record review
                supplyId: {             //new .. from medical record review
                    type: Schema.Types.ObjectId
                },
                icdCode: String,        //new .. from medical record review
                icdDesc: String,        //new .. from medical record review
                files: [{               //new .. files per cpt
                    fileName: String,
                    fileKey: String,
                }],
                deliveryDate: String,   //deprecated now, using dos now
                trackingNum: String,    //new .. files per cpt
                comments: String,       //new .. files per cpt
                dos: {
                    dos: Date,
                    month: Number,
                    day: Number,
                    year: Number
                }
                
            }],
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        },
        deliveryConfirmationHistory: [{
            supplies: [{
                painArea: String,       //new .. from medical record review
                supplyName: String,     //new .. from medical record review
                cptCode: String,        //new .. from medical record review
                desc: String,           //new .. from medical record review
                amount: Number,         //new .. from medical record review
                supplyId: {             //new .. from medical record review
                    type: Schema.Types.ObjectId
                },
                icdCode: String,        //new .. from medical record review
                icdDesc: String,        //new .. from medical record review
                files: [{               //new .. files per cpt
                    fileName: String,
                    fileKey: String,
                }],
                deliveryDate: String,   //deprecated now, using dos now
                trackingNum: String,    //new .. files per cpt
                comments: String,       //new .. files per cpt
                dos: {
                    dos: Date,
                    month: Number,
                    day: Number,
                    year: Number
                }
            }],
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }],
        deliveryConfirmationCall: {
            files: [{
                fileName: String,
                fileKey: String,
            }],
            comments: String,
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        },
        deliveryConfirmationCallHistory: [{
            files: [{
                fileName: String,
                fileKey: String,
            }],
            comments: String,
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }],
        billing: {
            comments: String,
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        },
        ar: {
            status: {
                type: String,
                enum: ['Paid', 'Denied']
            },
            comments: String,
            files: [{
                fileName: String,
                fileKey: String,
            }],
            chequeNumber: String,
            denialReason: String,
            paymentDate: String,
            paidAmount: String,
            on: Date,
            eobUploaded: Boolean,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        },
        arHistory: [{
            status: {
                type: String,
                enum: ['Paid', 'Denied']
            },
            comments: String,
            files: [{
                fileName: String,
                fileKey: String,
            }],
            chequeNumber: String,
            denialReason: String,
            paymentDate: String,
            paidAmount: String,
            on: Date,
            eobUploaded: Boolean,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }],
        posting: {
            files: [{
                fileName: String,
                fileKey: String,
            }],
            comments: String,
            chequeNumber: String,
            paymentDate: String,
            paidAmount: String,
            on: Date,
            eobUploaded: Boolean,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        },
        postingHistory: [{
            files: [{
                fileName: String,
                fileKey: String,
            }],
            comments: String,
            chequeNumber: String,
            paymentDate: String,
            paidAmount: String,
            on: Date,
            eobUploaded: Boolean,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }],
        refund: {
            comments: String,
            files: [{
                fileName: String,
                fileKey: String,
            }],
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            on: Date,
        },
        refundHistory: [{
            comments: String,
            files: [{
                fileName: String,
                fileKey: String,
            }],
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            on: Date,
        }],
        refundStatus: {
            status: {
                type: String,
                enum: ['Refunded', 'Not Refunded']
            },
            comments: String,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            on: Date,
        },
        refundStatusHistory: [{
            status: {
                type: String,
                enum: ['Refunded', 'Not Refunded']
            },
            comments: String,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            on: Date,
        }],
        transferToClient: {
            client: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            comments: String,
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        },
        transferToClientHistory: [{
            client: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            comments: String,
            on: Date,
            by: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }],
        deletedItems: {
            order: [{
                ordered: {
                    type: String,
                    enum: ['Yes', 'No']
                },
                noReason: String,
                supplies: [{
                    painArea: String,
                    supplyName: String,
                    supplyId: {
                        type: Schema.Types.ObjectId
                    },
                    comment: String
                }],
                files: [{
                    fileName: String,
                    fileKey: String,
                }],
                on: Date,
                by: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                }
            }],
            initialRecordings: [{
                files: [{
                    fileName: String,
                    fileKey: String,
                }],
                comments: String,
                status: String,
                on: Date,
                by: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                }
            }],
            clientAssignment: [{
                client: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                },
                comments: String,
                on: Date,
                by: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                }
            }],
            eligibility: [{
                comments: String,
                coinsurance: String,
                deductable: String,
                effectiveDate: Date,
                termDate: Date,
                copay: String,
                status: String,
                privInsName: String,
                privInsId: String,
                supplies: [{
                    painArea: String,
                    supplyName: String,
                    supplyId: {
                        type: Schema.Types.ObjectId
                    },
                    status: {
                        type: String,
                        enum: ['Pass', 'Failed']
                    },
                    comment: String
                }],
                cpts: [{
                    painArea: String,
                    supplyName: String,
                    cptCode: String,
                    desc: String,
                    amount: Number,
                    supplyId: {
                        type: Schema.Types.ObjectId
                    }
                }],
                by: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                },
                on: Date
            }],
            sns: [{
                comments: String,
                supplies: [{
                    painArea: String,
                    supplyName: String,
                    supplyId: {
                        type: Schema.Types.ObjectId
                    },
                    status: {
                        type: String,
                        enum: ['Pass', 'Failed']
                    },
                    comment: String
                }],
                cpts: [{
                    painArea: String,
                    supplyName: String,
                    cptCode: String,
                    desc: String,
                    amount: Number,
                    supplyId: {
                        type: Schema.Types.ObjectId
                    }
                }],
                by: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                },
                on: Date
            }],
            medicalRecordSent: [{
                files: [{
                    fileName: String,
                    fileKey: String,
                }],
                comments: String,
                on: Date,
                by: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                }
            }],
            medicalRecordReceived: [{
                files: [{
                    fileName: String,
                    fileKey: String,
                }],
                comments: String,
                status: {
                    type: String,
                    enum: ['Accepted', 'Rejected']
                },
                on: Date,
                by: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                }
            }],
            medicalRecordReview: [{
                status: {
                    type: String,
                    enum: ['Accepted', 'Rejected']
                },
                comments: String,
                on: Date,
                by: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                },
                supplies: [{
                    painArea: String,
                    supplyName: String,
                    cptCode: String,
                    desc: String,
                    amount: Number,
                    supplyId: {
                        type: Schema.Types.ObjectId
                    },
                    icdCode: String,
                    icdDesc: String
                }],
                potentialOrder: [{
                    painArea: String,
                    supplyName: String,
                    cptCode: String,
                    desc: String,
                    amount: Number,
                    supplyId: {
                        type: Schema.Types.ObjectId
                    },
                    comment: String
                }],
            }],
            cmnSent: [{
                files: [{
                    fileName: String,
                    fileKey: String,
                }],
                comments: String,
                on: Date,
                by: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                }
            }],
            cmnReceived: [{
                files: [{
                    fileName: String,
                    fileKey: String,
                }],
                comments: String,
                status: {
                    type: String,
                    enum: ['Accepted', 'Rejected']
                },
                on: Date,
                by: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                }
            }],
            cmnReview: [{
                status: {
                    type: String,
                    enum: ['Accepted', 'Rejected']
                },
                comments: String,
                on: Date,
                by: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                }
            }],
            priorAuthorization: [{
                files: [{
                    fileName: String,
                    fileKey: String,
                }],
                status: {
                    type: String,
                    enum: ['Accepted', 'Rejected','Not Required']
                },
                comments: String,
                on: Date,
                by: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                }
            }],
            providorAssignment: [{
                providor: String,
                comments: String,
                on: Date,
                by: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                }
            }],
            priorShippingCall: [{
                files: [{
                    fileName: String,
                    fileKey: String,
                }],
                comments: String,
                on: Date,
                by: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                }
            }],
            delivery: [{
                files: [{
                    fileName: String,
                    fileKey: String,
                }],
                comments: String,
                on: Date,
                by: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                }
            }],
            deliveryConfirmation: [{
                supplies: [{
                    painArea: String,       //new .. from medical record review
                    supplyName: String,     //new .. from medical record review
                    cptCode: String,        //new .. from medical record review
                    desc: String,           //new .. from medical record review
                    amount: Number,         //new .. from medical record review
                    supplyId: {             //new .. from medical record review
                        type: Schema.Types.ObjectId
                    },
                    icdCode: String,        //new .. from medical record review
                    icdDesc: String,        //new .. from medical record review
                    files: [{               //new .. files per cpt
                        fileName: String,
                        fileKey: String,
                    }],
                    deliveryDate: String,   //deprecated now, using dos now
                    trackingNum: String,    //new .. files per cpt
                    comments: String,       //new .. files per cpt
                    dos: {
                        dos: Date,
                        month: Number,
                        day: Number,
                        year: Number
                    }
                }],
                on: Date,
                by: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                }
            }],
            deliveryConfirmationCall: [{
                files: [{
                    fileName: String,
                    fileKey: String,
                }],
                comments: String,
                on: Date,
                by: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                }
            }],
            billing: [{
                comments: String,
                on: Date,
                by: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                }
            }],
            ar: [{
                status: {
                    type: String,
                    enum: ['Paid', 'Denied']
                },
                comments: String,
                files: [{
                    fileName: String,
                    fileKey: String,
                }],
                chequeNumber: String,
                denialReason: String,
                paymentDate: String,
                paidAmount: String,
                on: Date,
                eobUploaded: Boolean,
                by: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                }
            }],
            posting: [{
                files: [{
                    fileName: String,
                    fileKey: String,
                }],
                comments: String,
                chequeNumber: String,
                paymentDate: String,
                paidAmount: String,
                on: Date,
                eobUploaded: Boolean,
                by: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                }
            }],
            refund: {
                comments: String,
                files: [{
                    fileName: String,
                    fileKey: String,
                }],
                by: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                },
                on: Date,
            },
            refundStatus: {
                status: {
                    type: String,
                    enum: ['Refunded', 'Not Refunded']
                },
                comments: String,
                by: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                },
                on: Date,
            },
            transferToClient: [{
                client: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                },
                comments: String,
                on: Date,
                by: {
                    type: Schema.Types.ObjectId,
                    ref: 'user'
                }
            }],
        },
    }],
  metadata: {
    createdOn: Date,
    createdBy: mongoose.Schema.Types.ObjectId,
  }
}, { timestamps: true });

const Lead = mongoose.model('Lead', leadSchema);


app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    req.user = {
      _id: new mongoose.Types.ObjectId(process.env.USER_ID), 
      email: process.env.USER_EMAIL,
      role: process.env.USER_ROLE,
      permissions: {
        addLead: true
      }
    };
    next();
  });
  

  app.post('/submit', async (req, res) => {
    try {
      const data = req.body;
  
      // If journeys array doesn't exist, initialize it as an empty array.
      if (!data.journeys || !Array.isArray(data.journeys)) {
        data.journeys = [];
      }
      
      // Add a new journey object at the beginning of the array with static values.
      data.journeys.unshift({
        currentStatus: "QC Pending",
        applicableStatuses: ["QC Pending"]
      });
  
      // Attach metadata using the static user data.
      data.metadata = {
        createdOn: new Date(),
        createdBy: req.user._id
      };
  
      // Create and save the new lead document.
      const newLead = new Lead(data);
      const savedLead = await newLead.save();
  
      res.status(201).json({ message: "Lead successfully added", _id: savedLead._id });
    } catch (error) {
      console.error("Error saving lead:", error);
      res.status(500).json({ message: "An error occurred while saving the lead", error: error.message });
    }
  });
  
  

app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
