const object = {
    PhysicalExamination: {
        BloodPressure: {
            Sys: 60,
            Dia: 80,
        },
        Pulse: 99,
        Weight: 55,
        Temperature: 99,
        SpO2: 96,
    },
    Timestamp: 564564,
    DoctorID: "675",
    Conditions: ["avril"],
    Prescription: ["needs glucose", "needs carbs"],
    LabTests: [
        {
            TestType: "Bloop",
            HealthWorkerID: "4001",
            Results: "Fail",
            _id: "677b96503cf27efc016a9df8",
        },
    ],
    _id: "677b96503cf27efc016a9df7",
};

const sha256 = require("sha256");
console.log(sha256(JSON.stringify(object)));
