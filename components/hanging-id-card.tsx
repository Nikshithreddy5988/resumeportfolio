"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { profile, skillGroups } from "@/app/portfolio-data";

export function HangingIdCard() {
  const router = useRouter();
  const [flipped, setFlipped] = useState(false);
  const y = useMotionValue(0);
  const rotate = useTransform(y, [-40, 0, 180], [-5, 0, 5]);
  const topSkills = (skillGroups as any)
    .flatMap((group: { items: string[] }) => group.items)
    .slice(0, 8);

  return (
    <div className="lanyardWrap">
      <div className="lanyardClip">
        <div className="lanyardStrap lanyardLeft" />
        <div className="lanyardStrap lanyardRight" />
        <div className="lanyardJoint" />
      </div>
      <motion.button
        type="button"
        className={`idCardShell${flipped ? " isFlipped" : ""}`}
        onClick={() => setFlipped((current) => !current)}
        drag="y"
        style={{ y, rotate }}
        dragConstraints={{ top: 0, bottom: 260 }}
        dragElastic={0.14}
        animate={{ y: flipped ? 0 : [0, -4, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ rotate: flipped ? 0 : -2, y: -4 }}
        whileTap={{ scale: 0.985 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 170) {
            router.push("/contact");
          }
        }}
      >
        <div className="idCardFace idCardFront">
          <div className="idTopBar">
            <span className="idOrg">Portfolio ID</span>
            <span className="idChip">ACTIVE</span>
          </div>
          <div className="idIdentity">
            <div className="avatarBadge">
              <span>NS</span>
            </div>
            <div className="identityText">
              <p className="microLabel">Click to flip</p>
              <h2>{profile.name}</h2>
              <p className="roleLine">{profile.role}</p>
              <p className="locationLine">{profile.location}</p>
            </div>
          </div>
          <div className="idSignal">
            <span className="statusDot" />
            <span>Available for analytics and BI conversations</span>
          </div>
          <div className="laserBand" />
          <div className="idDetailGrid">
            <div>
              <span className="detailLabel">Focus</span>
              <strong>SQL, BI, Reporting</strong>
            </div>
            <div>
              <span className="detailLabel">Status</span>
              <strong>Open to Connect</strong>
            </div>
          </div>
          <div className="idFooter">
            <span>Flip for skills</span>
            <span>Drag down for contact</span>
          </div>
        </div>

        <div className="idCardFace idCardBack">
          <div className="idTopBar">
            <span className="idOrg">Skill Matrix</span>
            <span className="idChip">BACK</span>
          </div>
          <p className="microLabel">Back of the badge</p>
          <h2>Core Skills</h2>
          <div className="skillChipGrid">
            {(topSkills as any).map((skill: string) => (
              <span key={skill} className="skillChip">
                {skill}
              </span>
            ))}
          </div>
          <div className="laserBand" />
          <div className="idDetailGrid">
            <div>
              <span className="detailLabel">Core Stack</span>
              <strong>Power BI, SQL Server, Python</strong>
            </div>
            <div>
              <span className="detailLabel">Use</span>
              <strong>Validation, automation, dashboards</strong>
            </div>
          </div>
          <div className="idFooter">
            <span>Flip again for intro</span>
            <span>Pull down to connect</span>
          </div>
        </div>
      </motion.button>
      <div className="dragHint">Pull the badge down to jump to contact</div>
    </div>
  );
}
