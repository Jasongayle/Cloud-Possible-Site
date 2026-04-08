import { useState, useEffect, useRef } from "react";
import { CheckCircle2, Loader2, ChevronRight, ChevronLeft, Building2, Home, AlertCircle } from "lucide-react";

type ClientType = "residential" | "business" | null;
type Urgency = "low" | "medium" | "high" | null;

interface FormData {
  clientType: ClientType;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  numEmployees: string;
  currentSetup: string;
  deviceType: string;
  issueType: string;
  mainProblem: string;
  description: string;
  urgency: Urgency;
  consent: boolean;
}

const DEVICE_TYPES = ["Laptop", "Desktop", "Tablet", "Smartphone", "Printer", "Router/WiFi", "Other"];
const ISSUE_TYPES = ["Slow performance", "Virus/malware", "Won't turn on", "WiFi/internet issues", "Software help", "Data backup/recovery", "New device setup", "Other"];
const CURRENT_SETUPS = ["No IT currently", "Self-managed", "Part-time IT person", "Another IT provider", "Cloud services only", "Other"];
const MAIN_PROBLEMS = ["Frequent downtime", "Cybersecurity concerns", "Slow systems", "Outdated equipment", "Need cloud migration", "Staff IT support", "Email/communication setup", "Other"];
const EMPLOYEE_RANGES = ["1–5", "6–10", "11–25", "26–50", "51+"];

let _lastPostedHeight = 0;
let _postTimer: ReturnType<typeof setTimeout> | null = null;

function postHeight() {
  if (_postTimer) clearTimeout(_postTimer);
  _postTimer = setTimeout(() => {
    const height = document.documentElement.scrollHeight;
    if (Math.abs(height - _lastPostedHeight) > 2) {
      _lastPostedHeight = height;
      window.parent?.postMessage({ type: "replco:resize", height }, "*");
    }
  }, 50);
}

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
              i + 1 < current
                ? "bg-sky-500 text-white"
                : i + 1 === current
                ? "bg-sky-600 text-white ring-4 ring-sky-100"
                : "bg-slate-100 text-slate-400"
            }`}
          >
            {i + 1 < current ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
          </div>
          {i < total - 1 && (
            <div className={`w-8 h-0.5 mx-1 transition-all duration-300 ${i + 1 < current ? "bg-sky-500" : "bg-slate-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all ${
          error ? "border-red-400 bg-red-50" : "border-slate-200 hover:border-slate-300"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
  placeholder,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all appearance-none cursor-pointer ${
          error ? "border-red-400 bg-red-50" : "border-slate-200 hover:border-slate-300"
        } ${!value ? "text-slate-400" : "text-slate-800"}`}
      >
        <option value="">{placeholder || "Select an option"}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
    </div>
  );
}

function Textarea({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={3}
      className="w-full px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all resize-none"
    />
  );
}

export default function App() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormData>({
    clientType: null,
    name: "",
    email: "",
    phone: "",
    companyName: "",
    numEmployees: "",
    currentSetup: "",
    deviceType: "",
    issueType: "",
    mainProblem: "",
    description: "",
    urgency: null,
    consent: false,
  });

  const set = <K extends keyof FormData>(key: K) => (value: FormData[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  useEffect(() => {
    postHeight();
    const obs = new ResizeObserver(postHeight);
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [step, submitted]);

  function validateStep(s: number): Record<string, string> {
    const e: Record<string, string> = {};
    if (s === 1 && !form.clientType) e.clientType = "Please choose a service type";
    if (s === 2) {
      if (!form.name.trim() || form.name.trim().length < 2) e.name = "Full name is required";
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email is required";
      if (!form.phone.trim() || form.phone.trim().length < 7) e.phone = "Valid phone number is required";
    }
    if (s === 3) {
      if (form.clientType === "residential") {
        if (!form.deviceType) e.deviceType = "Please select a device type";
        if (!form.issueType) e.issueType = "Please select an issue type";
      } else if (form.clientType === "business") {
        if (!form.companyName.trim()) e.companyName = "Company name is required";
        if (!form.numEmployees) e.numEmployees = "Please select employee count";
        if (!form.mainProblem) e.mainProblem = "Please describe your main problem";
      }
    }
    if (s === 4 && !form.urgency) e.urgency = "Please select urgency level";
    if (s === 5 && !form.consent) e.consent = "You must agree to continue";
    return e;
  }

  function next() {
    const e = validateStep(step);
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setStep((s) => Math.min(s + 1, 5));
    window.scrollTo(0, 0);
  }

  function back() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo(0, 0);
  }

  async function handleSubmit() {
    const e = validateStep(5);
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          clientType: form.clientType,
          companyName: form.companyName.trim() || null,
          numEmployees: form.numEmployees ? parseInt(form.numEmployees.split("–")[0].replace("+", "").trim()) : null,
          currentSetup: form.currentSetup || null,
          deviceType: form.deviceType || null,
          issueType: form.issueType || null,
          mainProblem: form.mainProblem || null,
          description: form.description.trim() || null,
          urgency: form.urgency,
          consent: "agreed",
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(body.error || "Submission failed");
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const TOTAL_STEPS = 5;

  const stepTitles = [
    "What can we help with?",
    "Your contact info",
    form.clientType === "business" ? "About your business" : "About your issue",
    "How urgent is this?",
    "Almost done",
  ];

  if (submitted) {
    return (
      <div ref={containerRef} className="bg-gradient-to-br from-slate-50 to-sky-50 flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Request Received!</h2>
          <p className="text-slate-500 mb-6 leading-relaxed">
            Thanks, <span className="font-semibold text-slate-700">{form.name.split(" ")[0]}</span>! We've got your request and will follow up at <span className="font-semibold text-sky-600">{form.email}</span> within 1 business hour during business hours.
          </p>
          <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 text-sm text-sky-800">
            Have a quick question in the meantime? Email us at{" "}
            <a href="mailto:info@cloudpossible.ca" className="font-semibold underline">info@cloudpossible.ca</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-gradient-to-br from-slate-50 to-sky-50 p-4 py-8">
      <div className="w-full max-w-lg mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-sky-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-3">
            Cloud Possible
          </div>
          <h1 className="text-xl font-bold text-slate-800">Get IT Support</h1>
          <p className="text-sm text-slate-500 mt-1">Tell us about your issue and we'll get back to you fast.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-gradient-to-r from-sky-500 to-sky-600 px-6 pt-6 pb-4">
            <StepIndicator current={step} total={TOTAL_STEPS} />
            <h2 className="text-white font-bold text-lg text-center">{stepTitles[step - 1]}</h2>
            <p className="text-sky-100 text-xs text-center mt-1">Step {step} of {TOTAL_STEPS}</p>
          </div>

          <div className="p-6 space-y-5">
            {/* Step 1: Client Type */}
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-slate-500 text-sm text-center mb-6">Select the type of support you need:</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "residential", label: "Residential", sub: "Home & personal devices", icon: Home },
                    { value: "business", label: "Business", sub: "Company IT support", icon: Building2 },
                  ].map(({ value, label, sub, icon: Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => { set("clientType")(value as ClientType); setErrors({}); }}
                      className={`p-5 rounded-xl border-2 transition-all duration-200 text-left cursor-pointer ${
                        form.clientType === value
                          ? "border-sky-500 bg-sky-50"
                          : "border-slate-200 hover:border-sky-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${form.clientType === value ? "bg-sky-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className={`font-bold text-sm ${form.clientType === value ? "text-sky-700" : "text-slate-700"}`}>{label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
                    </button>
                  ))}
                </div>
                {errors.clientType && <p className="text-xs text-red-500 flex items-center gap-1 justify-center"><AlertCircle className="w-3 h-3" />{errors.clientType}</p>}
              </div>
            )}

            {/* Step 2: Contact Info */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label required>Full Name</Label>
                  <Input value={form.name} onChange={set("name")} placeholder="Jane Smith" error={errors.name} />
                </div>
                <div>
                  <Label required>Email Address</Label>
                  <Input value={form.email} onChange={set("email")} placeholder="jane@example.com" type="email" error={errors.email} />
                </div>
                <div>
                  <Label required>Phone Number</Label>
                  <Input value={form.phone} onChange={set("phone")} placeholder="(519) 555-0100" type="tel" error={errors.phone} />
                </div>
              </div>
            )}

            {/* Step 3: Dynamic Fields */}
            {step === 3 && form.clientType === "residential" && (
              <div className="space-y-4">
                <div>
                  <Label required>Device Type</Label>
                  <Select value={form.deviceType} onChange={set("deviceType")} options={DEVICE_TYPES} placeholder="Select your device" error={errors.deviceType} />
                </div>
                <div>
                  <Label required>Issue Type</Label>
                  <Select value={form.issueType} onChange={set("issueType")} options={ISSUE_TYPES} placeholder="What's the problem?" error={errors.issueType} />
                </div>
                <div>
                  <Label>Tell us more <span className="text-slate-400 font-normal">(optional)</span></Label>
                  <Textarea value={form.description} onChange={set("description")} placeholder="Any extra details that might help us prepare..." />
                </div>
              </div>
            )}

            {step === 3 && form.clientType === "business" && (
              <div className="space-y-4">
                <div>
                  <Label required>Company Name</Label>
                  <Input value={form.companyName} onChange={set("companyName")} placeholder="Acme Corp" error={errors.companyName} />
                </div>
                <div>
                  <Label required>Number of Employees</Label>
                  <Select value={form.numEmployees} onChange={set("numEmployees")} options={EMPLOYEE_RANGES} placeholder="Select range" error={errors.numEmployees} />
                </div>
                <div>
                  <Label>Current IT Setup <span className="text-slate-400 font-normal">(optional)</span></Label>
                  <Select value={form.currentSetup} onChange={set("currentSetup")} options={CURRENT_SETUPS} placeholder="How do you manage IT now?" />
                </div>
                <div>
                  <Label required>Main Problem</Label>
                  <Select value={form.mainProblem} onChange={set("mainProblem")} options={MAIN_PROBLEMS} placeholder="What's your biggest challenge?" error={errors.mainProblem} />
                </div>
                <div>
                  <Label>Additional Details <span className="text-slate-400 font-normal">(optional)</span></Label>
                  <Textarea value={form.description} onChange={set("description")} placeholder="Anything else we should know..." />
                </div>
              </div>
            )}

            {/* Step 4: Urgency */}
            {step === 4 && (
              <div className="space-y-4">
                <p className="text-slate-500 text-sm text-center">How soon do you need help?</p>
                <div className="space-y-3">
                  {[
                    { value: "low", label: "Low Priority", desc: "Not urgent — can wait a few days", color: "green" },
                    { value: "medium", label: "Medium Priority", desc: "Should be handled within 24 hours", color: "amber" },
                    { value: "high", label: "High Priority", desc: "Urgent — business or critical issue", color: "red" },
                  ].map(({ value, label, desc, color }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => { set("urgency")(value as Urgency); setErrors({}); }}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left cursor-pointer ${
                        form.urgency === value
                          ? color === "green"
                            ? "border-green-500 bg-green-50"
                            : color === "amber"
                            ? "border-amber-500 bg-amber-50"
                            : "border-red-500 bg-red-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          color === "green" ? "bg-green-500" : color === "amber" ? "bg-amber-500" : "bg-red-500"
                        }`} />
                        <div>
                          <p className="font-semibold text-sm text-slate-800">{label}</p>
                          <p className="text-xs text-slate-500">{desc}</p>
                        </div>
                        {form.urgency === value && (
                          <CheckCircle2 className={`ml-auto w-5 h-5 ${
                            color === "green" ? "text-green-500" : color === "amber" ? "text-amber-500" : "text-red-500"
                          }`} />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                {errors.urgency && <p className="text-xs text-red-500 flex items-center gap-1 justify-center"><AlertCircle className="w-3 h-3" />{errors.urgency}</p>}
              </div>
            )}

            {/* Step 5: Consent + Submit */}
            {step === 5 && (
              <div className="space-y-5">
                <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-600 leading-relaxed">
                  <p className="font-semibold text-slate-700 mb-2">Review your information:</p>
                  <div className="space-y-1">
                    <p><span className="font-medium">Name:</span> {form.name}</p>
                    <p><span className="font-medium">Email:</span> {form.email}</p>
                    <p><span className="font-medium">Phone:</span> {form.phone}</p>
                    <p><span className="font-medium">Type:</span> {form.clientType === "business" ? `Business — ${form.companyName}` : "Residential"}</p>
                    <p><span className="font-medium">Urgency:</span> {form.urgency}</p>
                  </div>
                </div>

                <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${form.consent ? "border-sky-500 bg-sky-50" : "border-slate-200 hover:border-slate-300"}`}>
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => { set("consent")(e.target.checked); setErrors({}); }}
                    className="mt-0.5 w-4 h-4 accent-sky-600 flex-shrink-0"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    I agree to be contacted by Cloud Possible regarding my IT support request. My information will be handled in accordance with Canadian privacy law (PIPEDA). I can opt out at any time.
                  </span>
                </label>
                {errors.consent && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.consent}</p>}

                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="px-6 pb-6 flex gap-3">
            {step > 1 && (
              <button
                type="button"
                onClick={back}
                disabled={submitting}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            )}
            {step < 5 ? (
              <button
                type="button"
                onClick={next}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-bold shadow-sm hover:shadow-md transition-all"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-bold shadow-sm hover:shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                ) : (
                  <><CheckCircle2 className="w-4 h-4" /> Get IT Help Now</>
                )}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          Cloud Possible &bull; A Think Jay Inc company &bull; Ontario, Canada
        </p>
      </div>
    </div>
  );
}
