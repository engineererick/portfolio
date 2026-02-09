"use client";

import { useRef, useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

export default function ContactSection() {
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const t = useTranslations("contact");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setSubmitted(true);
                formRef.current?.reset();
                // Reset success message after 5 seconds
                setTimeout(() => setSubmitted(false), 5000);
            } else {
                setError(data.message || t("error.generic"));
            }
        } catch (err) {
            setError(t("error.generic"));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="contact"
            className="relative z-10 px-6 md:px-12 lg:px-24 py-24"
        >
            <div className="max-w-2xl mx-auto">
                {/* Section Header */}
                <div className="mb-12 text-center">
                    <h2 className="mb-4">
                        {t("title")} <span className="text-gradient">{t("titleHighlight")}</span>
                    </h2>
                    <p className="text-[var(--foreground-muted)]">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Contact Form */}
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="card bg-[var(--background-elevated)] space-y-6"
                >
                    {/* Web3Forms Access Key */}
                    <input
                        type="hidden"
                        name="access_key"
                        value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || ""}
                    />

                    {/* Honeypot anti-bot */}
                    <input
                        type="checkbox"
                        name="botcheck"
                        className="hidden"
                        style={{ display: "none" }}
                    />

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">{t("form.name")}</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder={t("form.namePlaceholder")}
                                required
                                className="bg-[var(--background)] border-[var(--border)] focus:border-[var(--accent-primary)]"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">{t("form.email")}</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder={t("form.emailPlaceholder")}
                                required
                                className="bg-[var(--background)] border-[var(--border)] focus:border-[var(--accent-primary)]"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="subject">{t("form.subject")}</Label>
                        <Input
                            id="subject"
                            name="subject"
                            placeholder={t("form.subjectPlaceholder")}
                            required
                            className="bg-[var(--background)] border-[var(--border)] focus:border-[var(--accent-primary)]"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">{t("form.message")}</Label>
                        <Textarea
                            id="message"
                            name="message"
                            placeholder={t("form.messagePlaceholder")}
                            rows={5}
                            required
                            className="bg-[var(--background)] border-[var(--border)] focus:border-[var(--accent-primary)] resize-none"
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                            <AlertCircle size={16} />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Success Message */}
                    {submitted && (
                        <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 text-sm">
                            <CheckCircle2 size={16} />
                            <span>{t("success.description")}</span>
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={isSubmitting || submitted}
                        className="w-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                {t("form.sending")}
                            </>
                        ) : submitted ? (
                            <>
                                <CheckCircle2 size={18} />
                                {t("success.title")}
                            </>
                        ) : (
                            <>
                                {t("form.submit")}
                                <Send size={18} />
                            </>
                        )}
                    </Button>
                </form>
            </div>
        </section>
    );
}
